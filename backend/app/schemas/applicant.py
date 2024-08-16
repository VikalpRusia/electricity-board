from datetime import date
from typing import Optional

from pydantic import BaseModel


class ApplicantBase(BaseModel):
    ID: int
    Applicant_Name: str
    Gender: str
    District: str
    State: str
    Pincode: str
    Ownership: str
    GovtID_Type: str
    ID_Number: str
    Category: str
    Load_Applied_IN_KV: int
    Date_of_Application: date
    Date_of_Approval: Optional[date] = None
    Modified_Date: Optional[date] = None
    Status: str
    Reviewer_ID: Optional[int] = None
    Reviewer_Name: Optional[str] = None
    Reviewer_Comments: Optional[str] = None
