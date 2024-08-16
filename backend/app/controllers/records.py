from datetime import datetime, timezone

from sqlalchemy import select, func, and_, asc, desc
from sqlalchemy.ext.asyncio import AsyncSession

from models.applicant import Applicant


class ApplicantController:
    """
    A controller class to handle operations related to users (applicants).
    """

    @staticmethod
    async def fetch_applicants_paginated(
        db: AsyncSession,
        page_size: int,
        page_number: int,
        filters: dict,
        sort: dict,
        start_date: datetime | None,
        end_date: datetime | None,
    ):
        """
        Retrieve a list of users (applicants) from the database.

        :param db: AsyncSession instance connected to the database.
        :type db: AsyncSession
        :param page_size: Number of users per page.
        :type page_size: int
        :param page_number: Page number of results to retrieve.
        :type page_number: int
        :param filters: Dictionary of filters to apply to the query.
        :type filters: dict
        :param start_date: Start date for filtering the Date_of_Application.
        :type start_date: datetime | None
        :param end_date: End date for filtering the Date_of_Application.
        :type end_date: datetime | None

        :return: A list of Applicant objects representing users.

        :raises sqlalchemy.exc.SQLAlchemyError: If there's an error executing the query.
        """
        offset = (page_number - 1) * page_size
        query = select(Applicant).offset(offset).limit(page_size)
        for filter_key, filter_value in filters.items():
            query = query.filter(
                getattr(Applicant, filter_key).like(f"%{filter_value}%")
            )

        # Apply date filters
        if start_date and end_date:
            query = query.filter(
                and_(
                    Applicant.Date_of_Application >= start_date,
                    Applicant.Date_of_Application <= end_date,
                )
            )
        elif start_date:
            query = query.filter(Applicant.Date_of_Application >= start_date)
        elif end_date:
            query = query.filter(Applicant.Date_of_Application <= end_date)

        for sorted_key, sorted_value in sort.items():
            if sorted_value == '-1':
                query = query.order_by(desc(getattr(Applicant, sorted_key)))
            else:
                query = query.order_by(asc(getattr(Applicant, sorted_key)))
        result = await db.execute(query)
        applicants = result.scalars().all()
        return applicants

    @staticmethod
    async def get_records_count(db: AsyncSession, filters, start_date, end_date):
        query = select(func.count(Applicant.ID))
        for filter_key, filter_value in filters.items():
            query = query.filter(
                getattr(Applicant, filter_key).like(f"%{filter_value}%")
            )
        # Apply date filters
        if start_date and end_date:
            query = query.filter(
                and_(
                    Applicant.Date_of_Application >= start_date,
                    Applicant.Date_of_Application <= end_date,
                )
            )
        elif start_date:
            query = query.filter(Applicant.Date_of_Application >= start_date)
        elif end_date:
            query = query.filter(Applicant.Date_of_Application <= end_date)
        result = await db.execute(query)
        return result.scalar_one()

    @staticmethod
    async def sanitize_record(record_data, raise_error=False):
        for key in ["ID_Number", "Date_of_Application", "GovtID_Type", "ID"]:
            if key in record_data:
                if raise_error:
                    raise AssertionError(f"{key} cannot be present")
                del record_data[key]

    @staticmethod
    async def is_record_valid(record_data):
        if (
            "Load_Applied_IN_KV" in record_data
            and not 0 <= record_data["Load_Applied_IN_KV"] <= 200
        ):
            return False, AssertionError("Load Applied is Invalid")
        return True, None

    @staticmethod
    async def update_records(db: AsyncSession, record_id, record_data):
        record_dict = vars(record_data)
        await ApplicantController.sanitize_record(record_dict)
        record_dict["Modified_Date"] = datetime.now(timezone.utc)
        result, error = await ApplicantController.is_record_valid(record_dict)
        if not result:
            raise error
        query = select(Applicant).where(Applicant.ID == record_id)
        result = await db.execute(query)
        applicant = result.scalar_one()

        # Update the record with new data
        for key, value in record_dict.items():
            setattr(applicant, key, value)

        await db.commit()

    @staticmethod
    async def get_distinct_status(db: AsyncSession):
        query = select(func.distinct(Applicant.Status))
        result = await db.execute(query)
        return result.scalars().all()
