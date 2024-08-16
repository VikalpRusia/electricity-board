from datetime import datetime, timezone

from dateutil.relativedelta import relativedelta
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from models.applicant import Applicant


class ChartsController:

    @staticmethod
    async def get_charts_data(db: AsyncSession, months_to_display: int | None):
        query = select(
            func.extract("year", Applicant.Date_of_Application).label("year"),
            func.extract("month", Applicant.Date_of_Application).label("month"),
            Applicant.Status,
            func.count(Applicant.ID).label("application_count"),
        )
        if months_to_display:
            query = query.where(
                Applicant.Date_of_Application
                >= datetime.now(timezone.utc).date()
                - relativedelta(months=months_to_display)
            )
        query = query.group_by(
            func.extract("year", Applicant.Date_of_Application),
            func.extract("month", Applicant.Date_of_Application),
            Applicant.Status,
        ).order_by(
            func.extract("year", Applicant.Date_of_Application),
            func.extract("month", Applicant.Date_of_Application),
        )
        result = await db.execute(query)
        chart_data = {}
        for row in result.fetchall():
            if row[2] in chart_data:
                chart_data[row[2]]["series"].append(
                    {"name": f"{row[0]}-{row[1]}", "value": row[3]}
                )
            else:
                chart_data[row[2]] = {
                    "name": row[2],
                    "series": [{"name": f"{row[0]}-{row[1]}", "value": row[3]}],
                }
        return chart_data.values()
