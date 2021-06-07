-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/Z4QMwY
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "User" (
    "username" string   NOT NULL,
    "password" string   NOT NULL,
    "firstName" string   NOT NULL,
    "lastName" string   NOT NULL,
    "email" string   NOT NULL,
    "isCompany" boolean  DEFAULT false NOT NULL,
    CONSTRAINT "pk_User" PRIMARY KEY (
        "username"
     )
);

CREATE TABLE "Company" (
    "id" int   NOT NULL,
    "name" string   NOT NULL,
    "url" string   NOT NULL,
    "address" string   NOT NULL,
    "username" string   NOT NULL,
    CONSTRAINT "pk_Company" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "Job" (
    "id" int   NOT NULL,
    "position" string   NOT NULL,
    "hourlyPay" float   NOT NULL,
    "date" date   NOT NULL,
    "companyId" int   NOT NULL,
    CONSTRAINT "pk_Job" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "Application" (
    "ProductID" int   NOT NULL,
    "username" string   NOT NULL,
    "jobId" int   NOT NULL,
    CONSTRAINT "pk_Application" PRIMARY KEY (
        "ProductID"
     )
);

ALTER TABLE "Company" ADD CONSTRAINT "fk_Company_username" FOREIGN KEY("username")
REFERENCES "User" ("username");

ALTER TABLE "Job" ADD CONSTRAINT "fk_Job_companyId" FOREIGN KEY("companyId")
REFERENCES "Company" ("id");

ALTER TABLE "Application" ADD CONSTRAINT "fk_Application_username" FOREIGN KEY("username")
REFERENCES "User" ("username");

ALTER TABLE "Application" ADD CONSTRAINT "fk_Application_jobId" FOREIGN KEY("jobId")
REFERENCES "Job" ("id");

