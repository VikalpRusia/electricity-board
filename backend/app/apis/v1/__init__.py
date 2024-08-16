from fastapi import APIRouter

from apis.v1.charts_api import router as charts_api_router
from apis.v1.record_api import router as applicant_api_router

router = APIRouter(prefix="/api/v1", tags=["v1"])

router.include_router(applicant_api_router)
router.include_router(charts_api_router)
