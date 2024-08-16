from sqlalchemy import Column, Integer, String, Date, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Applicant(Base):
    __tablename__ = "applicants"

    ID = Column(Integer, primary_key=True)
    Applicant_Name = Column(String(255))
    Gender = Column(String(10))
    District = Column(String(50))
    State = Column(String(50))
    Pincode = Column(String(10))
    Ownership = Column(String(50))
    GovtID_Type = Column(String(50))
    ID_Number = Column(String(20))
    Category = Column(String(50))
    Load_Applied_IN_KV = Column(Integer)
    Date_of_Application = Column(Date)
    Date_of_Approval = Column(Date)
    Modified_Date = Column(Date)
    Status = Column(String(50))
    Reviewer_ID = Column(Integer)
    Reviewer_Name = Column(String(255))
    Reviewer_Comments = Column(Text)
