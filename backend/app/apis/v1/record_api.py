from datetime import datetime

from fastapi import APIRouter, Depends
from fastapi import Request
from fastapi_restful.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession

from controllers.records import ApplicantController
from db.database import get_db_session
from schemas.applicant import ApplicantBase

router = APIRouter(prefix="/records", tags=["records"])


@cbv(router)
class ApplicantAPIEndpoints:
    @router.get("/")
    async def get_applicants_paginated(
        self,
        page_size: int,
        page_number: int,
        request: Request,
        start_date: datetime | None = None,
        end_date: datetime | None = None,
        db: AsyncSession = Depends(get_db_session),
    ) -> list[ApplicantBase]:
        filters = {}
        sort = {}
        for params_key, params_value in request.query_params.items():
            if params_key.startswith("filter"):
                filters[params_key.replace("filter_", "", 1)] = params_value
            elif params_key.startswith("sort"):
                sort[params_key.replace("sort_", "", 1)] = params_value
        return await ApplicantController.fetch_applicants_paginated(
            db, page_size, page_number, filters, sort, start_date, end_date
        )

    @router.get("/count")
    async def get_records_count(
        self,
        request: Request,
        start_date: datetime | None = None,
        end_date: datetime | None = None,
        db: AsyncSession = Depends(get_db_session),
    ) -> int:
        filters = {}
        for params_key, params_value in request.query_params.items():
            if params_key.startswith("filter"):
                filters[params_key.replace("filter_", "", 1)] = params_value
        return await ApplicantController.get_records_count(
            db, filters, start_date, end_date
        )

    @router.put("/{record_id}")
    async def update_records(
        self,
        record_id: int,
        record: ApplicantBase,
        db: AsyncSession = Depends(get_db_session),
    ) -> None:
        return await ApplicantController.update_records(db, record_id, record)

    @router.get("/distinct-status")
    async def get_distinct_status(
        self, db: AsyncSession = Depends(get_db_session)
    ) -> None:
        return await ApplicantController.get_distinct_status(db)
