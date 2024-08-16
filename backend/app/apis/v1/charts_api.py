from fastapi import APIRouter, Depends
from fastapi_restful.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession

from controllers.charts import ChartsController
from db.database import get_db_session

router = APIRouter(prefix="/charts", tags=["charts"])


@cbv(router)
class ChartsApi:
    @router.get("/")
    async def get_chart_details(
        self, months_to_display: int = None, db: AsyncSession = Depends(get_db_session)
    ) -> list:
        return await ChartsController.get_charts_data(db, months_to_display)
