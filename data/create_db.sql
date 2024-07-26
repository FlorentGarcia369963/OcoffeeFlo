BEGIN;

DROP TABLE IF EXISTS "cart_items";
DROP TABLE IF EXISTS "bookmark";
DROP TABLE IF EXISTS "coffees";
DROP TABLE IF EXISTS "origins";
DROP TABLE IF EXISTS "categories";
DROP TABLE IF EXISTS "user";



CREATE TABLE IF NOT EXISTS "origins" (
    "id" SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "categories" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "coffees" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "reference" BIGINT NOT NULL,
    "origin_id" INT,
    "price_per_kg" DECIMAL(5,2) NOT NULL,
    "category_id" INT,
    "available" BOOLEAN NOT NULL,
    "date_creation" DATE, 
    "image_name" TEXT NOT NULL,
    FOREIGN KEY ("origin_id") REFERENCES "origins"("id"),
    FOREIGN KEY ("category_id") REFERENCES "categories"("id")
);

CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL PRIMARY KEY,
    "firstname" VARCHAR(255),
    "lastname" VARCHAR(255),
    "email" VARCHAR(100) UNIQUE NOT NULL,
    "password" VARCHAR(50) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "cart_items" (
        "id" SERIAL PRIMARY KEY,
        "quantity" INT,
        "user_id" INT NOT NULL,
        "item_id" INT NOT NULL, 
        FOREIGN KEY ("user_id") REFERENCES "user"("id"),
        FOREIGN KEY ("item_id") REFERENCES "coffees"("id")
    );

    CREATE TABLE IF NOT EXISTS "bookmark" (
        "id" SERIAL PRIMARY KEY,
        "user_id" INT NOT NULL,
        "item_id" INT NOT NULL, 
        FOREIGN KEY ("user_id") REFERENCES "user"("id"),
        FOREIGN KEY ("item_id") REFERENCES "coffees"("id")
    );

    
    


INSERT INTO "origins" ("name") VALUES
('Italie'),
('Colombie'),
('Éthiopie'),
('Brésil'),
('Guatemala'),
('Kenya'),
('Indonésie'),
('Costa Rica'),
('Vietnam'),
('Tanzanie'),
('Jamaïque'),
('Rwanda'),
('Panama'),
('Pérou'),
('Hawaï'),
('Nicaragua');

INSERT INTO "categories" ("name") VALUES
('Corsé'),
('Acide'),
('Fruité'),
('Doux'),
('Épicé'),
('Chocolaté');

INSERT INTO "coffees" ("name", "description", "reference", "origin_id", "price_per_kg", "category_id", "available", "date_creation", "image_name") VALUES
('Espresso', 'Café fort et concentré préparé en faisant passer de l''eau chaude à travers du café finement moulu.', 100955890, 1, 20.99, 1, TRUE, '2024-06-04', 'template.png'),
('Columbian', 'Café moyennement corsé avec une acidité vive et une saveur riche.', 100955894, 2, 18.75, 2, TRUE, '2024-06-04', 'template.png'),
('Ethiopian Yirgacheffe', 'Réputé pour son arôme floral, son acidité vive et ses notes de saveur citronnée.', 105589090, 3, 22.50, 3, TRUE, '2024-06-04', 'template.png'),
('Brazilian Santos', 'Café doux et lisse avec un profil de saveur de noisette.', 134009550, 4, 17.80, 4, TRUE, '2024-06-05', 'template.png'),
('Guatemalan Antigua', 'Café corsé avec des nuances chocolatées et une pointe d''épice.', 256505890, 5, 21.25, 1, TRUE, '2024-06-04', 'template.png'),
('Kenyan AA', 'Café complexe connu pour son acidité rappelant le vin et ses saveurs fruitées.', 295432730, 6, 23.70, 2, TRUE, '2024-06-04', 'template.png'),
('Sumatra Mandheling', 'Café profond et terreux avec un corps lourd et une faible acidité.', 302932754, 7, 19.95, 3, TRUE, '2024-06-05', 'template.png'),
('Costa Rican Tarrazu', 'Café vif et net avec une finition propre et une acidité vive.', 327302954, 8, 24.50, 4, TRUE, '2024-06-04', 'template.png'),
('Vietnamese Robusta', 'Café audacieux et fort avec une saveur robuste distinctive.', 549549090, 9, 16.75, 5, TRUE, '2024-06-04', 'template.png'),
('Tanzanian Peaberry', 'Acidité vive avec un profil de saveur rappelant le vin et un corps moyen.', 582954954, 10, 26.80, 6, TRUE, '2024-06-04', 'template.png'),
('Jamaican Blue Mountain', 'Reconnu pour sa saveur douce, son acidité vive et son absence d''amertume.', 589100954, 11, 39.25, 1, TRUE, '2024-06-05', 'template.png'),
('Rwandan Bourbon', 'Café avec des notes florales prononcées, une acidité vive et un corps moyen.', 650753915, 12, 21.90, 2, TRUE, '2024-06-04', 'template.png'),
('Panamanian Geisha', 'Café rare aux arômes floraux complexes, une acidité brillante et un profil de saveur distinct', 795501340, 13, 42.00, 3, TRUE, '2024-06-04', 'template.png'),
('Peruvian Arabica', 'Café équilibré avec des notes de chocolat, une acidité modérée et un corps velouté.', 954589100, 14, 19.40, 4, FALSE, '2024-06-04', 'template.png'),
('Hawaiian Kona', 'Café rare au goût riche, une acidité douce et des nuances subtiles.', 958090105, 15, 55.75, 5, FALSE, '2024-06-04', 'template.png'),
('Nicaraguan Maragogipe', 'Café avec des notes de fruits, une acidité vive et un corps plein.', 691550753, 16, 28.60, 6, FALSE, '2024-06-04', 'template.png');

INSERT INTO "user" ("firstname", "lastname", "email", "password") VALUES
('Alain', 'Connu', 'Alain-connu@gmail.com', 'pass'
);

-- INSERT INTO "cart_items" ("quantity", "user_id", "item_id") VALUES
-- ()

-- INSERT INTO "bookmark" ("user_id", "item_id") VALUES
-- (0,0);

COMMIT;
