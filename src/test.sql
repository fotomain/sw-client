
SELECT * FROM public.vehicle;

INSERT INTO public.vehicle(
    vehicle_id, vehicle_name, vin, make, model, year)
VALUES (111, 'car 111', 'vvv111', 'mmm111', 'model111', 1111);

INSERT INTO public.vehicle (
    vehicle_id, vehicle_name, vin, make, model, year)
VALUES (222, 'moto 222', 'vvv222', 'mmm222', 'model222', 2222);


SELECT *
FROM vehicle AS vv
LEFT JOIN vehicle_part AS pp TO vv.vehicle_name = pp.vehicle_id
;

--        vehicle_part
--        vehicle_part_id
--        vehicle_id
--        part_name
--        model

CREATE TABLE public.vehicle_part
(
    vehicle_part_id integer,
    vehicle_id integer,
    part_name text,
    model text,
    year integer,
    PRIMARY KEY (vehicle_part_id)
);

ALTER TABLE IF EXISTS public.vehicle_part
    OWNER to postgres;

--====================

==========================
CREATE TABLE public.location
(
    location_id integer,
    city text,
    state_province text,
    country text,
    PRIMARY KEY (location_id)
);

ALTER TABLE IF EXISTS public.location
    OWNER to postgres;

======================
CREATE TABLE public.vehicle_part_supplier
(
    supplier_id integer,
    vehicle_part_id integer,
    PRIMARY KEY (supplier_id,vehicle_part_id)
);

ALTER TABLE IF EXISTS public.vehicle_part_supplier
    OWNER to postgres;

======================
CREATE TABLE public.supplier
(
    supplier_id integer,
    city text,
    PRIMARY KEY (supplier_id)
);

ALTER TABLE IF EXISTS public.supplier
    OWNER to postgres;

==========
SELECT vehicle_name
FROM vehicle
WHERE vehicle_name LIKE 'G%'

SELECT make, COUNT(make) as total
FROM vehicle
GROUP BY make
HAVING COUNT(make)>0

SELECT vv.vehicle_id
FROM vehicle AS vv
LEFT JOIN vehicle_part AS pp ON vv.vehicle_id = pp.vehicle_id
WHERE pp.vehicle_id IS NULL

SELECT DISTINCT state_province
FROM location

SELECT *
FROM vehicle_part_location
WHERE location_id in ( 3, 6, 12 )
AND left_timestamp IS NOT NULL


SELECT cc.customer_id, cc.FIRSTNAME
FROM customer

SELECT oo.CUSTOMER_ID
FROM public.purchase_order AS oo

SELECT op.CUSTOMER_ID
FROM public.ORDER_PRODUCT AS op

SELECT op.ORDER_ID,op.PRODUCT_ID
FROM public.ORDER_PRODUCT AS op


SELECT oo.CUSTOMER_ID, op.ORDER_ID , cc.FIRSTNAME
FROM public.purchase_order AS oo
LEFT JOIN public.ORDER_PRODUCT AS op ON op.ORDER_ID = oo.ORDER_ID
LEFT JOIN public.CUSTOMER AS cc ON cc.CUSTOMER_ID = oo.CUSTOMER_ID
