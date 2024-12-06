-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Album" (
    "Album_ID" int   NOT NULL,
    "Album" varchar   NOT NULL,
    "Rank" int   NOT NULL,
    "Released_Year" int   NOT NULL,
    CONSTRAINT "pk_Album" PRIMARY KEY (
        "Album_ID"
     )
);

CREATE TABLE "Artist" (
    "Artist_ID" int   NOT NULL,
    "Artist" varchar   NOT NULL,
    CONSTRAINT "pk_Artist" PRIMARY KEY (
        "Artist_ID"
     )
);

CREATE TABLE "Country" (
    "Country_ID" int   NOT NULL,
    "Country_of_Release" varchar   NOT NULL,
    CONSTRAINT "pk_Country" PRIMARY KEY (
        "Country_ID"
     )
);

CREATE TABLE "Genre" (
    "Genre_ID" int   NOT NULL,
    "Genre" varchar   NOT NULL,
    CONSTRAINT "pk_Genre" PRIMARY KEY (
        "Genre_ID"
     )
);

CREATE TABLE "Subgenre" (
    "Subgenre_ID" int   NOT NULL,
    "Subgenre" varchar   NOT NULL,
    CONSTRAINT "pk_Subgenre" PRIMARY KEY (
        "Subgenre_ID"
     )
);

CREATE TABLE "Label" (
    "Label_ID" int   NOT NULL,
    "Label" varchar   NOT NULL,
    CONSTRAINT "pk_Label" PRIMARY KEY (
        "Label_ID"
     )
);

CREATE TABLE "Album_Artist" (
    "Album_Artist_ID" int   NOT NULL,
    "Album_ID" int   NOT NULL,
    "Artist_ID" int   NOT NULL,
    CONSTRAINT "pk_Album_Artist" PRIMARY KEY (
        "Album_Artist_ID"
     )
);

CREATE TABLE "Album_Country" (
    "Album_Country_ID" int   NOT NULL,
    "Album_ID" int   NOT NULL,
    "Country_ID" int   NOT NULL,
    CONSTRAINT "pk_Album_Country" PRIMARY KEY (
        "Album_Country_ID"
     )
);

CREATE TABLE "Album_Genre" (
    "Album_Genre_ID" int   NOT NULL,
    "Album_ID" int   NOT NULL,
    "Genre_ID" int   NOT NULL,
    CONSTRAINT "pk_Album_Genre" PRIMARY KEY (
        "Album_Genre_ID"
     )
);

CREATE TABLE "Album_Subgenre" (
    "Album_Subgenre_ID" int   NOT NULL,
    "Album_ID" int   NOT NULL,
    "Subgenre_ID" int   NOT NULL,
    CONSTRAINT "pk_Album_Subgenre" PRIMARY KEY (
        "Album_Subgenre_ID"
     )
);

-- Free plan table limit reached. SUBSCRIBE for more.



ALTER TABLE "Album_Artist" ADD CONSTRAINT "fk_Album_Artist_Album_ID" FOREIGN KEY("Album_ID")
REFERENCES "Album" ("Album_ID");

ALTER TABLE "Album_Artist" ADD CONSTRAINT "fk_Album_Artist_Artist_ID" FOREIGN KEY("Artist_ID")
REFERENCES "Artist" ("Artist_ID");

ALTER TABLE "Album_Country" ADD CONSTRAINT "fk_Album_Country_Album_ID" FOREIGN KEY("Album_ID")
REFERENCES "Album" ("Album_ID");

ALTER TABLE "Album_Country" ADD CONSTRAINT "fk_Album_Country_Country_ID" FOREIGN KEY("Country_ID")
REFERENCES "Country" ("Country_ID");

ALTER TABLE "Album_Genre" ADD CONSTRAINT "fk_Album_Genre_Album_ID" FOREIGN KEY("Album_ID")
REFERENCES "Album" ("Album_ID");

ALTER TABLE "Album_Genre" ADD CONSTRAINT "fk_Album_Genre_Genre_ID" FOREIGN KEY("Genre_ID")
REFERENCES "Genre" ("Genre_ID");

ALTER TABLE "Album_Subgenre" ADD CONSTRAINT "fk_Album_Subgenre_Album_ID" FOREIGN KEY("Album_ID")
REFERENCES "Album" ("Album_ID");

ALTER TABLE "Album_Subgenre" ADD CONSTRAINT "fk_Album_Subgenre_Subgenre_ID" FOREIGN KEY("Subgenre_ID")
REFERENCES "Subgenre" ("Subgenre_ID");

-- Free plan table limit reached. SUBSCRIBE for more.



-- Free plan table limit reached. SUBSCRIBE for more.



