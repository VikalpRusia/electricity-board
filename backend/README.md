# FastAPI Application

## Overview

This is a FastAPI application designed to manage an electricity board's staff. The application provides a web interface
for staff management, supports asynchronous connections to a MySQL database using SQLAlchemy, and follows modern
software development practices.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- FastAPI-based backend
- Asynchronous database operations with SQLAlchemy
- RESTful API endpoints for staff management

## Installation

### Prerequisites

- Python 3.12+
- MySQL
- Docker (optional, for containerized deployment)

### Steps

1. Start docker:
    ```bash
    docker compose up -d
    ```

2. Create a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

3. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Set up the database: (alembic can be used instead of this all together)
    ```bash
    mysql -u root -p
    CREATE DATABASE applicants;
    ```
5. Create table
    ```bash
   mysql -u root -p
   CREATE TABLE IF NOT EXISTS applicants (
        ID INT PRIMARY KEY,
        Applicant_Name VARCHAR(255),
        Gender VARCHAR(10),
        District VARCHAR(50),
        State VARCHAR(50),
        Pincode VARCHAR(10),
        Ownership VARCHAR(50),
        GovtID_Type VARCHAR(50),
        ID_Number VARCHAR(20),
        Category VARCHAR(50),
        Load_Applied_IN_KV INT,
        Date_of_Application DATE,
        Date_of_Approval DATE,
        Modified_Date DATE,
        Status VARCHAR(50),
        Reviewer_ID INT,
        Reviewer_Name VARCHAR(255),
        Reviewer_Comments TEXT
    )
    ```

## Configuration

Edit the `config.constants` file to configure the application settings. Key configurations include:

- `DATABASE_URL`: Connection URL for the MySQL database

## Usage

### Running the Application

Start the FastAPI application:

```bash
uvicorn app.main:app --reload
```

## API Endpoints

- `http://127.0.0.1:8000/docs`
- `http://127.0.0.1:8000/redoc`
