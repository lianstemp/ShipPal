CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA public;

-- CLEANUP
TRUNCATE TABLE public.messages CASCADE;
TRUNCATE TABLE public.matches CASCADE;
TRUNCATE TABLE public.swipes CASCADE;
TRUNCATE TABLE public.buying_requests CASCADE;
TRUNCATE TABLE public.products CASCADE;
TRUNCATE TABLE public.profiles CASCADE;
TRUNCATE TABLE auth.identities CASCADE;
TRUNCATE TABLE auth.users CASCADE;

-- USERS & IDENTITIES

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '5a511e01-c38c-4eda-853a-e1f33ada0af6',
    'authenticated',
    'authenticated',
    'lthompson@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "5a511e01-c38c-4eda-853a-e1f33ada0af6", "role": "seller", "email": "lthompson@example.com", "country": "Indonesia", "full_name": "Michael Gonzalez", "company_name": "PT Saunders Spices Trading", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '536ab7c2-66a6-44a3-bea8-7179f70a821e',
    '5a511e01-c38c-4eda-853a-e1f33ada0af6',
    '5a511e01-c38c-4eda-853a-e1f33ada0af6',
    format('{"sub":"%s","email":"%s"}', '5a511e01-c38c-4eda-853a-e1f33ada0af6', 'lthompson@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'd478eacf-d1bc-4fde-a276-a61039764454',
    'authenticated',
    'authenticated',
    'angela27@example.net',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "d478eacf-d1bc-4fde-a276-a61039764454", "role": "seller", "email": "angela27@example.net", "country": "Indonesia", "full_name": "Maria Young", "company_name": "PT Perez Seafood Makmur", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'd41b2164-c906-4464-a188-f9a195f6009c',
    'd478eacf-d1bc-4fde-a276-a61039764454',
    'd478eacf-d1bc-4fde-a276-a61039764454',
    format('{"sub":"%s","email":"%s"}', 'd478eacf-d1bc-4fde-a276-a61039764454', 'angela27@example.net')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '4e660715-e9f8-4382-a379-75268f8265e1',
    'authenticated',
    'authenticated',
    'hgreene@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "4e660715-e9f8-4382-a379-75268f8265e1", "role": "seller", "email": "hgreene@example.com", "country": "Indonesia", "full_name": "William Hill", "company_name": "PT Sexton Agriculture Sentosa", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'e2771ca6-e729-4a4c-942f-9e427a569b57',
    '4e660715-e9f8-4382-a379-75268f8265e1',
    '4e660715-e9f8-4382-a379-75268f8265e1',
    format('{"sub":"%s","email":"%s"}', '4e660715-e9f8-4382-a379-75268f8265e1', 'hgreene@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '5a911d43-4390-4323-a197-3b8987ab62d7',
    'authenticated',
    'authenticated',
    'wcastro@example.org',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "5a911d43-4390-4323-a197-3b8987ab62d7", "role": "seller", "email": "wcastro@example.org", "country": "Indonesia", "full_name": "Maria Duarte", "company_name": "PT Wagner Textile Makmur", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'e927a35c-12c0-4337-898d-13fbd143970e',
    '5a911d43-4390-4323-a197-3b8987ab62d7',
    '5a911d43-4390-4323-a197-3b8987ab62d7',
    format('{"sub":"%s","email":"%s"}', '5a911d43-4390-4323-a197-3b8987ab62d7', 'wcastro@example.org')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '373b370d-896f-44d1-afa6-14632a57bade',
    'authenticated',
    'authenticated',
    'emoore@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "373b370d-896f-44d1-afa6-14632a57bade", "role": "seller", "email": "emoore@example.com", "country": "Indonesia", "full_name": "Karen Chan", "company_name": "PT Stewart Handicraft Jaya", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '71a2af4b-92e3-4402-8e45-8168fe291d9a',
    '373b370d-896f-44d1-afa6-14632a57bade',
    '373b370d-896f-44d1-afa6-14632a57bade',
    format('{"sub":"%s","email":"%s"}', '373b370d-896f-44d1-afa6-14632a57bade', 'emoore@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '7e610dba-935d-4fb7-b1ec-ef4ee852bf44',
    'authenticated',
    'authenticated',
    'thomas25@example.org',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "7e610dba-935d-4fb7-b1ec-ef4ee852bf44", "role": "seller", "email": "thomas25@example.org", "country": "Indonesia", "full_name": "Molly Trevino", "company_name": "PT Campbell Handicraft Export", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '58df530d-8b9c-408b-a8b4-3e3502e5ded4',
    '7e610dba-935d-4fb7-b1ec-ef4ee852bf44',
    '7e610dba-935d-4fb7-b1ec-ef4ee852bf44',
    format('{"sub":"%s","email":"%s"}', '7e610dba-935d-4fb7-b1ec-ef4ee852bf44', 'thomas25@example.org')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'a2c793e8-56c1-43ea-be4f-e7031dbae86a',
    'authenticated',
    'authenticated',
    'april00@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "a2c793e8-56c1-43ea-be4f-e7031dbae86a", "role": "seller", "email": "april00@example.com", "country": "Indonesia", "full_name": "Christopher Clayton", "company_name": "PT Macdonald Seafood Indo", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '75a320bb-fefc-4390-b140-0c748cb2455c',
    'a2c793e8-56c1-43ea-be4f-e7031dbae86a',
    'a2c793e8-56c1-43ea-be4f-e7031dbae86a',
    format('{"sub":"%s","email":"%s"}', 'a2c793e8-56c1-43ea-be4f-e7031dbae86a', 'april00@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'c7d030b3-ca41-487a-829f-baf2809d9cf2',
    'authenticated',
    'authenticated',
    'linda44@example.net',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "c7d030b3-ca41-487a-829f-baf2809d9cf2", "role": "seller", "email": "linda44@example.net", "country": "Indonesia", "full_name": "Shelby Fowler", "company_name": "PT Moyer Seafood Global", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '0d1a927b-4c09-4294-91a4-e4c25365d89b',
    'c7d030b3-ca41-487a-829f-baf2809d9cf2',
    'c7d030b3-ca41-487a-829f-baf2809d9cf2',
    format('{"sub":"%s","email":"%s"}', 'c7d030b3-ca41-487a-829f-baf2809d9cf2', 'linda44@example.net')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '2e3a97f6-391b-499b-a00d-f78f0a756cac',
    'authenticated',
    'authenticated',
    'brian41@example.net',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "2e3a97f6-391b-499b-a00d-f78f0a756cac", "role": "seller", "email": "brian41@example.net", "country": "Indonesia", "full_name": "Cynthia Bridges", "company_name": "PT Torres Agriculture Indo", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '4f355cb9-f2cc-4c9f-b1bf-628d989ae8b0',
    '2e3a97f6-391b-499b-a00d-f78f0a756cac',
    '2e3a97f6-391b-499b-a00d-f78f0a756cac',
    format('{"sub":"%s","email":"%s"}', '2e3a97f6-391b-499b-a00d-f78f0a756cac', 'brian41@example.net')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'dc9af0bf-c51d-451d-9737-6a673312321e',
    'authenticated',
    'authenticated',
    'mcphersonjean@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "dc9af0bf-c51d-451d-9737-6a673312321e", "role": "seller", "email": "mcphersonjean@example.com", "country": "Indonesia", "full_name": "Patricia Henderson", "company_name": "PT Maldonado Essential Oils Makmur", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'c66a6b52-3718-4d0c-943c-4688656e5f74',
    'dc9af0bf-c51d-451d-9737-6a673312321e',
    'dc9af0bf-c51d-451d-9737-6a673312321e',
    format('{"sub":"%s","email":"%s"}', 'dc9af0bf-c51d-451d-9737-6a673312321e', 'mcphersonjean@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '5cde7c37-c59d-4d23-bef3-54c777e90959',
    'authenticated',
    'authenticated',
    'chandleradam@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "5cde7c37-c59d-4d23-bef3-54c777e90959", "role": "seller", "email": "chandleradam@example.com", "country": "Indonesia", "full_name": "Briana Powell", "company_name": "PT Robinson Processed Food Utama", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'cc6c8e9b-4684-4833-953c-38e91b967896',
    '5cde7c37-c59d-4d23-bef3-54c777e90959',
    '5cde7c37-c59d-4d23-bef3-54c777e90959',
    format('{"sub":"%s","email":"%s"}', '5cde7c37-c59d-4d23-bef3-54c777e90959', 'chandleradam@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '75c87aaa-3124-4113-9f90-b806d32dfe0e',
    'authenticated',
    'authenticated',
    'mvazquez@example.net',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "75c87aaa-3124-4113-9f90-b806d32dfe0e", "role": "seller", "email": "mvazquez@example.net", "country": "Indonesia", "full_name": "Bridget Miller", "company_name": "PT Chaney Furniture Sentosa", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '5a0cd7dd-6694-415a-bfd4-b35c9cbfb36d',
    '75c87aaa-3124-4113-9f90-b806d32dfe0e',
    '75c87aaa-3124-4113-9f90-b806d32dfe0e',
    format('{"sub":"%s","email":"%s"}', '75c87aaa-3124-4113-9f90-b806d32dfe0e', 'mvazquez@example.net')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '97dc3fd3-03b7-4862-a8d4-e6123dcb6efe',
    'authenticated',
    'authenticated',
    'dreeves@example.org',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "97dc3fd3-03b7-4862-a8d4-e6123dcb6efe", "role": "seller", "email": "dreeves@example.org", "country": "Indonesia", "full_name": "Lisa Patterson", "company_name": "PT Jackson Handicraft Trading", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '238d8eac-a67e-4767-ad20-582fff2d1125',
    '97dc3fd3-03b7-4862-a8d4-e6123dcb6efe',
    '97dc3fd3-03b7-4862-a8d4-e6123dcb6efe',
    format('{"sub":"%s","email":"%s"}', '97dc3fd3-03b7-4862-a8d4-e6123dcb6efe', 'dreeves@example.org')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '288a74c0-41c5-4d83-b68e-5143746885fa',
    'authenticated',
    'authenticated',
    'jaygarza@example.net',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "288a74c0-41c5-4d83-b68e-5143746885fa", "role": "seller", "email": "jaygarza@example.net", "country": "Indonesia", "full_name": "Ashley Lucas", "company_name": "PT Brown Essential Oils Sejahtera", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '785f251b-4e8e-4a60-87e2-a66d3e3c0c9c',
    '288a74c0-41c5-4d83-b68e-5143746885fa',
    '288a74c0-41c5-4d83-b68e-5143746885fa',
    format('{"sub":"%s","email":"%s"}', '288a74c0-41c5-4d83-b68e-5143746885fa', 'jaygarza@example.net')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'cab9bcdf-41a8-4d14-8aaf-dd1dc33ae2e1',
    'authenticated',
    'authenticated',
    'sean01@example.org',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "cab9bcdf-41a8-4d14-8aaf-dd1dc33ae2e1", "role": "seller", "email": "sean01@example.org", "country": "Indonesia", "full_name": "Leroy Santos", "company_name": "PT Williams Agriculture Persada", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'caa8cf6d-2328-43fa-83ac-c7fcb10af981',
    'cab9bcdf-41a8-4d14-8aaf-dd1dc33ae2e1',
    'cab9bcdf-41a8-4d14-8aaf-dd1dc33ae2e1',
    format('{"sub":"%s","email":"%s"}', 'cab9bcdf-41a8-4d14-8aaf-dd1dc33ae2e1', 'sean01@example.org')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '0bc6434f-e94a-4ec7-baee-e4399cc1021d',
    'authenticated',
    'authenticated',
    'kchapman@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "0bc6434f-e94a-4ec7-baee-e4399cc1021d", "role": "seller", "email": "kchapman@example.com", "country": "Indonesia", "full_name": "Maurice Ryan", "company_name": "PT Lynn Handicraft Export", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '24300b90-7e70-4b5c-af6a-d1d010a967cd',
    '0bc6434f-e94a-4ec7-baee-e4399cc1021d',
    '0bc6434f-e94a-4ec7-baee-e4399cc1021d',
    format('{"sub":"%s","email":"%s"}', '0bc6434f-e94a-4ec7-baee-e4399cc1021d', 'kchapman@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '180b8254-611e-4a60-955d-49769e2cb50d',
    'authenticated',
    'authenticated',
    'kennethwilson@example.net',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "180b8254-611e-4a60-955d-49769e2cb50d", "role": "seller", "email": "kennethwilson@example.net", "country": "Indonesia", "full_name": "Gregory Johnson", "company_name": "PT Hernandez Agriculture Nusantara", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '77e98bcc-0780-4ecc-9a67-204bc7b0f180',
    '180b8254-611e-4a60-955d-49769e2cb50d',
    '180b8254-611e-4a60-955d-49769e2cb50d',
    format('{"sub":"%s","email":"%s"}', '180b8254-611e-4a60-955d-49769e2cb50d', 'kennethwilson@example.net')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '3545427c-5327-4957-be68-b25ef0836c37',
    'authenticated',
    'authenticated',
    'richrachel@example.org',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "3545427c-5327-4957-be68-b25ef0836c37", "role": "seller", "email": "richrachel@example.org", "country": "Indonesia", "full_name": "Kelly Williams", "company_name": "PT Mccarthy Essential Oils Nusantara", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'e7ba1fc6-73d7-4722-b0b0-85ab2a5b207f',
    '3545427c-5327-4957-be68-b25ef0836c37',
    '3545427c-5327-4957-be68-b25ef0836c37',
    format('{"sub":"%s","email":"%s"}', '3545427c-5327-4957-be68-b25ef0836c37', 'richrachel@example.org')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '54f5a131-4672-4220-a83c-9d74862d1823',
    'authenticated',
    'authenticated',
    'katie09@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "54f5a131-4672-4220-a83c-9d74862d1823", "role": "seller", "email": "katie09@example.com", "country": "Indonesia", "full_name": "Andrea Graves", "company_name": "PT Ferguson Seafood Jaya", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '3e3d2990-3cc6-4654-9fcf-95ac576665bb',
    '54f5a131-4672-4220-a83c-9d74862d1823',
    '54f5a131-4672-4220-a83c-9d74862d1823',
    format('{"sub":"%s","email":"%s"}', '54f5a131-4672-4220-a83c-9d74862d1823', 'katie09@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '84befe4e-7710-4184-bd72-4853e2d25c42',
    'authenticated',
    'authenticated',
    'allenwilliam@example.org',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "84befe4e-7710-4184-bd72-4853e2d25c42", "role": "seller", "email": "allenwilliam@example.org", "country": "Indonesia", "full_name": "Charles Harris", "company_name": "PT Jackson Handicraft Mandiri", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'b0f4c862-a343-44dc-85e7-e7d5e88d04b3',
    '84befe4e-7710-4184-bd72-4853e2d25c42',
    '84befe4e-7710-4184-bd72-4853e2d25c42',
    format('{"sub":"%s","email":"%s"}', '84befe4e-7710-4184-bd72-4853e2d25c42', 'allenwilliam@example.org')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'f5af43b1-5fdf-44a1-9cce-061cc9794e17',
    'authenticated',
    'authenticated',
    'jimmy35@example.org',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "f5af43b1-5fdf-44a1-9cce-061cc9794e17", "role": "buyer", "email": "jimmy35@example.org", "country": "Vietnam", "full_name": "Erin Lozano", "company_name": "Lewis Ventures", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '3ad8ccf6-5c21-4d0f-bd85-8e325cbb36e7',
    'f5af43b1-5fdf-44a1-9cce-061cc9794e17',
    'f5af43b1-5fdf-44a1-9cce-061cc9794e17',
    format('{"sub":"%s","email":"%s"}', 'f5af43b1-5fdf-44a1-9cce-061cc9794e17', 'jimmy35@example.org')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '6bdc776a-2809-4b0f-b250-824d7517c0ef',
    'authenticated',
    'authenticated',
    'khahn@example.org',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "6bdc776a-2809-4b0f-b250-824d7517c0ef", "role": "buyer", "email": "khahn@example.org", "country": "Djibouti", "full_name": "Joseph Richards", "company_name": "Bush Sourcing", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'ebe48bc7-7f8c-49b8-b823-f2b95f72a85e',
    '6bdc776a-2809-4b0f-b250-824d7517c0ef',
    '6bdc776a-2809-4b0f-b250-824d7517c0ef',
    format('{"sub":"%s","email":"%s"}', '6bdc776a-2809-4b0f-b250-824d7517c0ef', 'khahn@example.org')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '4db3324a-3834-4c6d-9058-26469035096f',
    'authenticated',
    'authenticated',
    'grahamlisa@example.net',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "4db3324a-3834-4c6d-9058-26469035096f", "role": "buyer", "email": "grahamlisa@example.net", "country": "Svalbard & Jan Mayen Islands", "full_name": "Shane Baker", "company_name": "Cortez LLC", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '7527e23c-9449-4905-9d6e-531d17bf648c',
    '4db3324a-3834-4c6d-9058-26469035096f',
    '4db3324a-3834-4c6d-9058-26469035096f',
    format('{"sub":"%s","email":"%s"}', '4db3324a-3834-4c6d-9058-26469035096f', 'grahamlisa@example.net')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '47156a87-88bb-4fe0-ac33-e2a7dd5f75f7',
    'authenticated',
    'authenticated',
    'lindsaymendoza@example.net',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "47156a87-88bb-4fe0-ac33-e2a7dd5f75f7", "role": "buyer", "email": "lindsaymendoza@example.net", "country": "Paraguay", "full_name": "Kathy Morgan", "company_name": "Hardin Ventures", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '669a7636-4ea9-41c2-84a4-e33360aaacbc',
    '47156a87-88bb-4fe0-ac33-e2a7dd5f75f7',
    '47156a87-88bb-4fe0-ac33-e2a7dd5f75f7',
    format('{"sub":"%s","email":"%s"}', '47156a87-88bb-4fe0-ac33-e2a7dd5f75f7', 'lindsaymendoza@example.net')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'a098b3d7-9233-4cd5-b024-1215963beb04',
    'authenticated',
    'authenticated',
    'marissa90@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "a098b3d7-9233-4cd5-b024-1215963beb04", "role": "buyer", "email": "marissa90@example.com", "country": "Malaysia", "full_name": "Patricia Fitzgerald", "company_name": "Carroll Wholesale", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'a6d9e2aa-7345-4d8b-87f2-f23f8e716eb6',
    'a098b3d7-9233-4cd5-b024-1215963beb04',
    'a098b3d7-9233-4cd5-b024-1215963beb04',
    format('{"sub":"%s","email":"%s"}', 'a098b3d7-9233-4cd5-b024-1215963beb04', 'marissa90@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '94af2e74-6f40-4d22-868c-e1917a6f550f',
    'authenticated',
    'authenticated',
    'yturner@example.net',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "94af2e74-6f40-4d22-868c-e1917a6f550f", "role": "buyer", "email": "yturner@example.net", "country": "Guam", "full_name": "Jason Ballard", "company_name": "Rivera Partners", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '1ddf85ee-308c-4b5f-9710-4720e8efcd83',
    '94af2e74-6f40-4d22-868c-e1917a6f550f',
    '94af2e74-6f40-4d22-868c-e1917a6f550f',
    format('{"sub":"%s","email":"%s"}', '94af2e74-6f40-4d22-868c-e1917a6f550f', 'yturner@example.net')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '9d21fb32-5489-4fb1-9c7e-27f8bdb7bbf4',
    'authenticated',
    'authenticated',
    'itaylor@example.net',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "9d21fb32-5489-4fb1-9c7e-27f8bdb7bbf4", "role": "buyer", "email": "itaylor@example.net", "country": "Bahamas", "full_name": "Adam Howe", "company_name": "Gibson Logistics", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '19a871bc-4e08-4a96-8158-645fde2d28ab',
    '9d21fb32-5489-4fb1-9c7e-27f8bdb7bbf4',
    '9d21fb32-5489-4fb1-9c7e-27f8bdb7bbf4',
    format('{"sub":"%s","email":"%s"}', '9d21fb32-5489-4fb1-9c7e-27f8bdb7bbf4', 'itaylor@example.net')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'ffa8eb1a-49e8-4e10-9473-1e8fcb79940f',
    'authenticated',
    'authenticated',
    'elizabethle@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "ffa8eb1a-49e8-4e10-9473-1e8fcb79940f", "role": "buyer", "email": "elizabethle@example.com", "country": "Burundi", "full_name": "Michael Ho", "company_name": "Hooper GmbH", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '303470b5-f498-45b1-9a1b-169e662af920',
    'ffa8eb1a-49e8-4e10-9473-1e8fcb79940f',
    'ffa8eb1a-49e8-4e10-9473-1e8fcb79940f',
    format('{"sub":"%s","email":"%s"}', 'ffa8eb1a-49e8-4e10-9473-1e8fcb79940f', 'elizabethle@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '1afa0c20-0bd9-433b-a2cb-05341a1ae1fc',
    'authenticated',
    'authenticated',
    'mchan@example.org',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "1afa0c20-0bd9-433b-a2cb-05341a1ae1fc", "role": "buyer", "email": "mchan@example.org", "country": "India", "full_name": "Daniel Petersen", "company_name": "Fuller Group", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'f98b11ca-2093-4903-aa3c-8842a45ea38f',
    '1afa0c20-0bd9-433b-a2cb-05341a1ae1fc',
    '1afa0c20-0bd9-433b-a2cb-05341a1ae1fc',
    format('{"sub":"%s","email":"%s"}', '1afa0c20-0bd9-433b-a2cb-05341a1ae1fc', 'mchan@example.org')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'ab4e96e4-7c19-4a88-9d19-5106e0853fb9',
    'authenticated',
    'authenticated',
    'rileylance@example.org',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "ab4e96e4-7c19-4a88-9d19-5106e0853fb9", "role": "buyer", "email": "rileylance@example.org", "country": "Cambodia", "full_name": "Annette Chen", "company_name": "Hartman Trading", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'c34c6312-d949-4a3f-bb5b-9db700971129',
    'ab4e96e4-7c19-4a88-9d19-5106e0853fb9',
    'ab4e96e4-7c19-4a88-9d19-5106e0853fb9',
    format('{"sub":"%s","email":"%s"}', 'ab4e96e4-7c19-4a88-9d19-5106e0853fb9', 'rileylance@example.org')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '2fe55eeb-58c8-4acd-aa9d-7782c0bfd470',
    'authenticated',
    'authenticated',
    'claudiaperez@example.net',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "2fe55eeb-58c8-4acd-aa9d-7782c0bfd470", "role": "buyer", "email": "claudiaperez@example.net", "country": "Croatia", "full_name": "Debra Sullivan", "company_name": "Howe Imports", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'cce14c5e-3b1e-429c-8a6d-1f3136786da9',
    '2fe55eeb-58c8-4acd-aa9d-7782c0bfd470',
    '2fe55eeb-58c8-4acd-aa9d-7782c0bfd470',
    format('{"sub":"%s","email":"%s"}', '2fe55eeb-58c8-4acd-aa9d-7782c0bfd470', 'claudiaperez@example.net')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '3fd17f01-37c8-4079-a772-5dc6d6dd14e0',
    'authenticated',
    'authenticated',
    'jerryallen@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "3fd17f01-37c8-4079-a772-5dc6d6dd14e0", "role": "buyer", "email": "jerryallen@example.com", "country": "Zimbabwe", "full_name": "Jeffrey Bennett", "company_name": "Wright Ventures", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '5ab8409f-53d4-4c41-917b-aa764ce052d2',
    '3fd17f01-37c8-4079-a772-5dc6d6dd14e0',
    '3fd17f01-37c8-4079-a772-5dc6d6dd14e0',
    format('{"sub":"%s","email":"%s"}', '3fd17f01-37c8-4079-a772-5dc6d6dd14e0', 'jerryallen@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '62c1ce81-32fd-495d-83f1-f23962a0a9d8',
    'authenticated',
    'authenticated',
    'williamwhite@example.net',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "62c1ce81-32fd-495d-83f1-f23962a0a9d8", "role": "buyer", "email": "williamwhite@example.net", "country": "Gibraltar", "full_name": "Paul Cooper", "company_name": "Jones LLC", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '99130295-8842-492f-8b45-9ecbb1493a86',
    '62c1ce81-32fd-495d-83f1-f23962a0a9d8',
    '62c1ce81-32fd-495d-83f1-f23962a0a9d8',
    format('{"sub":"%s","email":"%s"}', '62c1ce81-32fd-495d-83f1-f23962a0a9d8', 'williamwhite@example.net')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '8b24c804-a623-48d6-a8cc-bb6819a2bb26',
    'authenticated',
    'authenticated',
    'lauriehuang@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "8b24c804-a623-48d6-a8cc-bb6819a2bb26", "role": "buyer", "email": "lauriehuang@example.com", "country": "Australia", "full_name": "Matthew Johnston", "company_name": "Brown Logistics", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '6f481ec0-6afd-4529-a204-a7321b928bcd',
    '8b24c804-a623-48d6-a8cc-bb6819a2bb26',
    '8b24c804-a623-48d6-a8cc-bb6819a2bb26',
    format('{"sub":"%s","email":"%s"}', '8b24c804-a623-48d6-a8cc-bb6819a2bb26', 'lauriehuang@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '5eb2d4eb-911c-4cd6-a55b-91398453ef0b',
    'authenticated',
    'authenticated',
    'ruthwilliams@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "5eb2d4eb-911c-4cd6-a55b-91398453ef0b", "role": "buyer", "email": "ruthwilliams@example.com", "country": "Ireland", "full_name": "James Smith", "company_name": "Williams Foods", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'bf980570-0e63-46aa-9d3e-05cb8c542252',
    '5eb2d4eb-911c-4cd6-a55b-91398453ef0b',
    '5eb2d4eb-911c-4cd6-a55b-91398453ef0b',
    format('{"sub":"%s","email":"%s"}', '5eb2d4eb-911c-4cd6-a55b-91398453ef0b', 'ruthwilliams@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '4d3aeff1-694d-4f7b-a4da-c9f8008f99a0',
    'authenticated',
    'authenticated',
    'justin69@example.net',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "4d3aeff1-694d-4f7b-a4da-c9f8008f99a0", "role": "buyer", "email": "justin69@example.net", "country": "Romania", "full_name": "Kendra Oneill", "company_name": "Chang Ltd", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'b294d900-e693-4900-aeb8-bb31ddb92f90',
    '4d3aeff1-694d-4f7b-a4da-c9f8008f99a0',
    '4d3aeff1-694d-4f7b-a4da-c9f8008f99a0',
    format('{"sub":"%s","email":"%s"}', '4d3aeff1-694d-4f7b-a4da-c9f8008f99a0', 'justin69@example.net')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '1cc01c59-a386-48bb-947a-8e1dc2393bf4',
    'authenticated',
    'authenticated',
    'oconnorwendy@example.org',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "1cc01c59-a386-48bb-947a-8e1dc2393bf4", "role": "buyer", "email": "oconnorwendy@example.org", "country": "Turkey", "full_name": "Jason Pierce", "company_name": "Wilson Ventures", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '619657ac-857e-479d-9aa5-2e08421f324f',
    '1cc01c59-a386-48bb-947a-8e1dc2393bf4',
    '1cc01c59-a386-48bb-947a-8e1dc2393bf4',
    format('{"sub":"%s","email":"%s"}', '1cc01c59-a386-48bb-947a-8e1dc2393bf4', 'oconnorwendy@example.org')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '94e4c54b-a8f5-452b-b679-129b39a4c65e',
    'authenticated',
    'authenticated',
    'djacobs@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "94e4c54b-a8f5-452b-b679-129b39a4c65e", "role": "buyer", "email": "djacobs@example.com", "country": "Bouvet Island (Bouvetoya)", "full_name": "Cheryl Simmons", "company_name": "Logan Trading", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '7a4a9e99-4b36-404e-a926-da6973cc5d62',
    '94e4c54b-a8f5-452b-b679-129b39a4c65e',
    '94e4c54b-a8f5-452b-b679-129b39a4c65e',
    format('{"sub":"%s","email":"%s"}', '94e4c54b-a8f5-452b-b679-129b39a4c65e', 'djacobs@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '62a7f2af-f36e-45f9-815e-865897ff3259',
    'authenticated',
    'authenticated',
    'newmanrobert@example.net',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "62a7f2af-f36e-45f9-815e-865897ff3259", "role": "buyer", "email": "newmanrobert@example.net", "country": "Puerto Rico", "full_name": "Cole Cannon", "company_name": "Ingram Logistics", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '8d8103bb-3c89-4016-9bf4-11f494cb2296',
    '62a7f2af-f36e-45f9-815e-865897ff3259',
    '62a7f2af-f36e-45f9-815e-865897ff3259',
    format('{"sub":"%s","email":"%s"}', '62a7f2af-f36e-45f9-815e-865897ff3259', 'newmanrobert@example.net')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'e9480aab-7207-402d-a6ce-ef21f331027b',
    'authenticated',
    'authenticated',
    'laneemily@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "e9480aab-7207-402d-a6ce-ef21f331027b", "role": "buyer", "email": "laneemily@example.com", "country": "Hungary", "full_name": "Jeffrey Wu", "company_name": "Beck Imports", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '96b23317-0908-4403-a1d6-5e2d1c5dea65',
    'e9480aab-7207-402d-a6ce-ef21f331027b',
    'e9480aab-7207-402d-a6ce-ef21f331027b',
    format('{"sub":"%s","email":"%s"}', 'e9480aab-7207-402d-a6ce-ef21f331027b', 'laneemily@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'e19bd4b7-c743-4c2e-b6b6-6e026346ac46',
    'authenticated',
    'authenticated',
    'james31@example.net',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "e19bd4b7-c743-4c2e-b6b6-6e026346ac46", "role": "buyer", "email": "james31@example.net", "country": "Cameroon", "full_name": "Mitchell Taylor", "company_name": "Mack Group", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'bf7b6e5b-eb67-4382-989f-7488b505746a',
    'e19bd4b7-c743-4c2e-b6b6-6e026346ac46',
    'e19bd4b7-c743-4c2e-b6b6-6e026346ac46',
    format('{"sub":"%s","email":"%s"}', 'e19bd4b7-c743-4c2e-b6b6-6e026346ac46', 'james31@example.net')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '845c8b53-52f1-4e2c-bbab-75699dbff3b9',
    'authenticated',
    'authenticated',
    'randyleon@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "845c8b53-52f1-4e2c-bbab-75699dbff3b9", "role": "buyer", "email": "randyleon@example.com", "country": "Slovenia", "full_name": "Annette Thomas", "company_name": "Austin International", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '2955f428-52fa-452a-88d8-01dd51ccf531',
    '845c8b53-52f1-4e2c-bbab-75699dbff3b9',
    '845c8b53-52f1-4e2c-bbab-75699dbff3b9',
    format('{"sub":"%s","email":"%s"}', '845c8b53-52f1-4e2c-bbab-75699dbff3b9', 'randyleon@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '81aadc41-159e-4194-b641-771fd2f8ba73',
    'authenticated',
    'authenticated',
    'colemankayla@example.org',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "81aadc41-159e-4194-b641-771fd2f8ba73", "role": "buyer", "email": "colemankayla@example.org", "country": "Dominican Republic", "full_name": "Raymond Jones", "company_name": "Morales LLC", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '8ccdad18-378d-46f4-89f3-1a6c3edd1c37',
    '81aadc41-159e-4194-b641-771fd2f8ba73',
    '81aadc41-159e-4194-b641-771fd2f8ba73',
    format('{"sub":"%s","email":"%s"}', '81aadc41-159e-4194-b641-771fd2f8ba73', 'colemankayla@example.org')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '493de775-08db-4d51-b3c1-01afc0d439a0',
    'authenticated',
    'authenticated',
    'luis95@example.net',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "493de775-08db-4d51-b3c1-01afc0d439a0", "role": "buyer", "email": "luis95@example.net", "country": "Kazakhstan", "full_name": "Sarah Williamson", "company_name": "Ward LLC", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'eb416f7a-d609-478a-9e28-977ec2f266a5',
    '493de775-08db-4d51-b3c1-01afc0d439a0',
    '493de775-08db-4d51-b3c1-01afc0d439a0',
    format('{"sub":"%s","email":"%s"}', '493de775-08db-4d51-b3c1-01afc0d439a0', 'luis95@example.net')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '0266f2ec-5a1b-40df-9ba1-18be6fb08173',
    'authenticated',
    'authenticated',
    'garrett70@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "0266f2ec-5a1b-40df-9ba1-18be6fb08173", "role": "buyer", "email": "garrett70@example.com", "country": "Jamaica", "full_name": "Brian Phillips", "company_name": "Briggs Global", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'db8fb851-2d83-4d5b-8929-fe86a25c832f',
    '0266f2ec-5a1b-40df-9ba1-18be6fb08173',
    '0266f2ec-5a1b-40df-9ba1-18be6fb08173',
    format('{"sub":"%s","email":"%s"}', '0266f2ec-5a1b-40df-9ba1-18be6fb08173', 'garrett70@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '8657f046-5430-4506-8871-01a3e92400f4',
    'authenticated',
    'authenticated',
    'thompsonmarc@example.net',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "8657f046-5430-4506-8871-01a3e92400f4", "role": "buyer", "email": "thompsonmarc@example.net", "country": "Gabon", "full_name": "Bonnie Gibson", "company_name": "Anderson Logistics", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '6f32dd60-13ad-49a7-9f91-d56f1a2c3203',
    '8657f046-5430-4506-8871-01a3e92400f4',
    '8657f046-5430-4506-8871-01a3e92400f4',
    format('{"sub":"%s","email":"%s"}', '8657f046-5430-4506-8871-01a3e92400f4', 'thompsonmarc@example.net')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'bff4f9c8-e22d-4df6-a47d-34790d4bfa81',
    'authenticated',
    'authenticated',
    'tpalmer@example.org',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "bff4f9c8-e22d-4df6-a47d-34790d4bfa81", "role": "buyer", "email": "tpalmer@example.org", "country": "Niue", "full_name": "Brandon Green", "company_name": "Webb Ventures", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    'bdbbfa14-cc07-46ce-a40f-ac0cdf5ecc01',
    'bff4f9c8-e22d-4df6-a47d-34790d4bfa81',
    'bff4f9c8-e22d-4df6-a47d-34790d4bfa81',
    format('{"sub":"%s","email":"%s"}', 'bff4f9c8-e22d-4df6-a47d-34790d4bfa81', 'tpalmer@example.org')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '2c1bd39b-8256-4bbb-be68-96ca153d88b3',
    'authenticated',
    'authenticated',
    'valeriecook@example.org',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "2c1bd39b-8256-4bbb-be68-96ca153d88b3", "role": "buyer", "email": "valeriecook@example.org", "country": "Lebanon", "full_name": "Matthew Stephens", "company_name": "Ford Trading", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '7f53808c-0f52-4d82-bf60-8afee4e97d17',
    '2c1bd39b-8256-4bbb-be68-96ca153d88b3',
    '2c1bd39b-8256-4bbb-be68-96ca153d88b3',
    format('{"sub":"%s","email":"%s"}', '2c1bd39b-8256-4bbb-be68-96ca153d88b3', 'valeriecook@example.org')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '9b280eed-ba62-4947-abd0-8541655e5970',
    'authenticated',
    'authenticated',
    'jorge70@example.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "9b280eed-ba62-4947-abd0-8541655e5970", "role": "buyer", "email": "jorge70@example.com", "country": "Lao People''s Democratic Republic", "full_name": "Michael Johnston", "company_name": "Mendez Imports", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '8c3c0165-9e81-4120-ba9e-38f96ba7d9fa',
    '9b280eed-ba62-4947-abd0-8541655e5970',
    '9b280eed-ba62-4947-abd0-8541655e5970',
    format('{"sub":"%s","email":"%s"}', '9b280eed-ba62-4947-abd0-8541655e5970', 'jorge70@example.com')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '3484e600-73c0-4ac9-9095-9065b925dbf9',
    'authenticated',
    'authenticated',
    'xmartinez@example.org',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"sub": "3484e600-73c0-4ac9-9095-9065b925dbf9", "role": "buyer", "email": "xmartinez@example.org", "country": "South Africa", "full_name": "Donald Braun", "company_name": "Ball Imports", "email_verified": true, "phone_verified": false}',
    timezone('utc', now()),
    timezone('utc', now()),
    '', '', '', ''
);

INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
    '51e37ac5-50e6-4edd-b351-12026ebce088',
    '3484e600-73c0-4ac9-9095-9065b925dbf9',
    '3484e600-73c0-4ac9-9095-9065b925dbf9',
    format('{"sub":"%s","email":"%s"}', '3484e600-73c0-4ac9-9095-9065b925dbf9', 'xmartinez@example.org')::jsonb,
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
);

-- PRODUCTS

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '5855c673-96cf-4634-8b20-e6f5d98f3dd7',
    '5a511e01-c38c-4eda-853a-e1f33ada0af6',
    'Nutmeg Whole (Pala)',
    'Grade ABCD whole nutmegs, suitable for export.',
    'Spices',
    1000,
    50,
    26.41,
    'USD',
    9.8,
    ARRAY['https://image.pollinations.ai/prompt/Nutmeg%20Whole%20%28Pala%29%20Spices?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '10ffcef5-8f31-4023-80fd-4fa45dbed298',
    '5a511e01-c38c-4eda-853a-e1f33ada0af6',
    'Soft Shell Crab',
    'Frozen soft shell crab, premium quality.',
    'Seafood',
    1000,
    100,
    145.79,
    'USD',
    8.2,
    ARRAY['https://image.pollinations.ai/prompt/Soft%20Shell%20Crab%20Seafood?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '683c53fc-7df0-43dc-876c-1b539d5e3153',
    '5a511e01-c38c-4eda-853a-e1f33ada0af6',
    'Seaweed Cottonii',
    'Dried seaweed Cottonii for carrageenan production.',
    'Seafood',
    5000,
    50,
    27.98,
    'USD',
    8.7,
    ARRAY['https://image.pollinations.ai/prompt/Seaweed%20Cottonii%20Seafood?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '288b0c50-0a3c-4deb-878e-eb02b09fbf3f',
    '5a511e01-c38c-4eda-853a-e1f33ada0af6',
    'Turmeric Powder',
    'High curcumin turmeric powder for food and health supplements.',
    'Spices',
    1000,
    100,
    126.53,
    'USD',
    8.8,
    ARRAY['https://image.pollinations.ai/prompt/Turmeric%20Powder%20Spices?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '0d869971-ec83-4717-a97d-7a159a4ac706',
    'd478eacf-d1bc-4fde-a276-a61039764454',
    'Black Pepper Corns',
    'Lampung black pepper, bold and spicy flavor, cleaned.',
    'Spices',
    5000,
    50,
    44.84,
    'USD',
    8.5,
    ARRAY['https://image.pollinations.ai/prompt/Black%20Pepper%20Corns%20Spices?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'e5e38d4b-c6c6-470c-a036-69d20a0f004e',
    'd478eacf-d1bc-4fde-a276-a61039764454',
    'Red Snapper Fillet',
    'Fresh frozen red snapper fillets, skin-on.',
    'Seafood',
    1000,
    50,
    80.34,
    'USD',
    8.1,
    ARRAY['https://image.pollinations.ai/prompt/Red%20Snapper%20Fillet%20Seafood?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '8c955f4b-bc58-4a2d-98ff-d598febbd378',
    'd478eacf-d1bc-4fde-a276-a61039764454',
    'Whole Cloves (Cengkeh)',
    'Premium dried cloves from Maluku, high oil content.',
    'Spices',
    1000,
    100,
    57.04,
    'USD',
    8.1,
    ARRAY['https://image.pollinations.ai/prompt/Whole%20Cloves%20%28Cengkeh%29%20Spices?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '7b18e797-1017-46ce-bcbc-43049c323a4a',
    'd478eacf-d1bc-4fde-a276-a61039764454',
    'Seaweed Cottonii',
    'Dried seaweed Cottonii for carrageenan production.',
    'Seafood',
    1000,
    200,
    67.94,
    'USD',
    8.8,
    ARRAY['https://image.pollinations.ai/prompt/Seaweed%20Cottonii%20Seafood?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '9b4e9c72-5964-4619-a74b-df31d2f2bdfc',
    '4e660715-e9f8-4382-a379-75268f8265e1',
    'Cocoa Beans Fermented',
    'High quality fermented cocoa beans, ready for chocolate production.',
    'Agriculture',
    2000,
    100,
    7.61,
    'USD',
    8.8,
    ARRAY['https://image.pollinations.ai/prompt/Cocoa%20Beans%20Fermented%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '3446c85b-1859-49ee-8eaa-ae650801cff4',
    '4e660715-e9f8-4382-a379-75268f8265e1',
    'Teak Root Coffee Table',
    'Unique coffee table made from reclaimed teak root.',
    'Furniture',
    5000,
    50,
    99.25,
    'USD',
    9.1,
    ARRAY['https://image.pollinations.ai/prompt/Teak%20Root%20Coffee%20Table%20Furniture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'e60c59b1-c420-4b66-bb66-7dcd903cd5ba',
    '4e660715-e9f8-4382-a379-75268f8265e1',
    'Cocoa Beans Fermented',
    'High quality fermented cocoa beans, ready for chocolate production.',
    'Agriculture',
    5000,
    100,
    63.64,
    'USD',
    9.0,
    ARRAY['https://image.pollinations.ai/prompt/Cocoa%20Beans%20Fermented%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '06372aea-be71-449d-aa9e-35782224f696',
    '4e660715-e9f8-4382-a379-75268f8265e1',
    'Organic White Rice',
    'Premium organic white rice, long grain, pesticide-free.',
    'Agriculture',
    2000,
    200,
    93.82,
    'USD',
    9.3,
    ARRAY['https://image.pollinations.ai/prompt/Organic%20White%20Rice%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'c16a595c-a7e0-46b3-81b3-2b4b06c03ba5',
    '5a911d43-4390-4323-a197-3b8987ab62d7',
    'Sumatra Mandheling Coffee',
    'Full-bodied with an intense, complex taste. Low acidity. Earthy notes.',
    'Agriculture',
    2000,
    50,
    143.32,
    'USD',
    9.0,
    ARRAY['https://image.pollinations.ai/prompt/Sumatra%20Mandheling%20Coffee%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'ba24304c-04d3-4fda-b9b8-b38f847c76de',
    '5a911d43-4390-4323-a197-3b8987ab62d7',
    'Porang Chips (Konjac)',
    'Dried porang chips for glucomannan extraction. High purity.',
    'Agriculture',
    2000,
    100,
    24.94,
    'USD',
    8.5,
    ARRAY['https://image.pollinations.ai/prompt/Porang%20Chips%20%28Konjac%29%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '1bb3ec9a-66fb-4077-9114-cf5e33370541',
    '5a911d43-4390-4323-a197-3b8987ab62d7',
    'Copra (Dried Coconut)',
    'Sun-dried copra with high oil content for oil extraction.',
    'Agriculture',
    1000,
    100,
    13.14,
    'USD',
    9.6,
    ARRAY['https://image.pollinations.ai/prompt/Copra%20%28Dried%20Coconut%29%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '7f8c9551-6112-4479-b686-869e24525ce4',
    '5a911d43-4390-4323-a197-3b8987ab62d7',
    'Betel Nuts (Areca)',
    'Whole dried betel nuts, split 80-85%, moisture <5%.',
    'Agriculture',
    500,
    50,
    119.02,
    'USD',
    8.1,
    ARRAY['https://image.pollinations.ai/prompt/Betel%20Nuts%20%28Areca%29%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '9963c6f0-cf23-4dc0-9142-d0644ef08fac',
    '373b370d-896f-44d1-afa6-14632a57bade',
    'Teak Wood Dining Chair',
    'Solid teak wood dining chair with minimalist design. Natural finish.',
    'Furniture',
    2000,
    50,
    114.13,
    'USD',
    8.0,
    ARRAY['https://image.pollinations.ai/prompt/Teak%20Wood%20Dining%20Chair%20Furniture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '8e469561-daa3-4701-8df7-c6efa7223c4c',
    '373b370d-896f-44d1-afa6-14632a57bade',
    'Seagrass Rug',
    'Handwoven seagrass rug, natural texture and color.',
    'Handicraft',
    500,
    100,
    43.82,
    'USD',
    9.3,
    ARRAY['https://image.pollinations.ai/prompt/Seagrass%20Rug%20Handicraft?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '11476baa-41f4-4f5d-a18a-8f30e22c7a5b',
    '373b370d-896f-44d1-afa6-14632a57bade',
    'Teak Root Coffee Table',
    'Unique coffee table made from reclaimed teak root.',
    'Furniture',
    1000,
    200,
    48.98,
    'USD',
    9.9,
    ARRAY['https://image.pollinations.ai/prompt/Teak%20Root%20Coffee%20Table%20Furniture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '8bca2e5a-7ce4-4df6-86cd-ae777a067843',
    '373b370d-896f-44d1-afa6-14632a57bade',
    'Suar Wood Slab Table',
    'Natural edge suar wood dining table, one-piece slab.',
    'Furniture',
    1000,
    50,
    56.28,
    'USD',
    9.6,
    ARRAY['https://image.pollinations.ai/prompt/Suar%20Wood%20Slab%20Table%20Furniture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'b87fd965-9f32-4b1a-a2e1-a4e588eba267',
    '7e610dba-935d-4fb7-b1ec-ef4ee852bf44',
    'Clove Leaf Oil',
    'Distilled from clove leaves, high eugenol content.',
    'Essential Oils',
    5000,
    200,
    27.1,
    'USD',
    8.4,
    ARRAY['https://image.pollinations.ai/prompt/Clove%20Leaf%20Oil%20Essential%20Oils?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'd7b012e1-b4da-4120-b2ea-ede07fa292e9',
    '7e610dba-935d-4fb7-b1ec-ef4ee852bf44',
    'Clove Leaf Oil',
    'Distilled from clove leaves, high eugenol content.',
    'Essential Oils',
    2000,
    100,
    12.68,
    'USD',
    9.1,
    ARRAY['https://image.pollinations.ai/prompt/Clove%20Leaf%20Oil%20Essential%20Oils?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'bc4632c8-2ea1-447f-8f35-19a6a1e3b156',
    '7e610dba-935d-4fb7-b1ec-ef4ee852bf44',
    'Nutmeg Oil',
    'Steam distilled nutmeg oil, spicy and sweet.',
    'Essential Oils',
    500,
    200,
    20.81,
    'USD',
    9.9,
    ARRAY['https://image.pollinations.ai/prompt/Nutmeg%20Oil%20Essential%20Oils?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '3ae35f45-362e-4d3e-8665-221c3f47b4d0',
    '7e610dba-935d-4fb7-b1ec-ef4ee852bf44',
    'Macrame Wall Hanging',
    'Boho style macrame wall hanging, cotton rope.',
    'Handicraft',
    5000,
    100,
    34.45,
    'USD',
    8.5,
    ARRAY['https://image.pollinations.ai/prompt/Macrame%20Wall%20Hanging%20Handicraft?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '5de70820-32a8-4648-82ba-bbaa08697e74',
    'a2c793e8-56c1-43ea-be4f-e7031dbae86a',
    'Vannamei Shrimp Frozen',
    'IQF Vannamei shrimp, various sizes available.',
    'Seafood',
    2000,
    200,
    72.71,
    'USD',
    8.4,
    ARRAY['https://image.pollinations.ai/prompt/Vannamei%20Shrimp%20Frozen%20Seafood?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '4ce08a29-f372-4efc-9d3d-40c782b83e83',
    'a2c793e8-56c1-43ea-be4f-e7031dbae86a',
    'Porang Chips (Konjac)',
    'Dried porang chips for glucomannan extraction. High purity.',
    'Agriculture',
    1000,
    100,
    59.14,
    'USD',
    10.0,
    ARRAY['https://image.pollinations.ai/prompt/Porang%20Chips%20%28Konjac%29%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '554b4c86-3d79-4910-9bd0-4602583a8e6e',
    'a2c793e8-56c1-43ea-be4f-e7031dbae86a',
    'Cocoa Beans Fermented',
    'High quality fermented cocoa beans, ready for chocolate production.',
    'Agriculture',
    2000,
    100,
    8.86,
    'USD',
    8.9,
    ARRAY['https://image.pollinations.ai/prompt/Cocoa%20Beans%20Fermented%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '56b5d0d8-8d01-48ca-9b76-e82977423205',
    'a2c793e8-56c1-43ea-be4f-e7031dbae86a',
    'Betel Nuts (Areca)',
    'Whole dried betel nuts, split 80-85%, moisture <5%.',
    'Agriculture',
    1000,
    50,
    60.33,
    'USD',
    9.4,
    ARRAY['https://image.pollinations.ai/prompt/Betel%20Nuts%20%28Areca%29%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '45b5db68-c4a2-4c34-ad5a-dabb8a32884e',
    'c7d030b3-ca41-487a-829f-baf2809d9cf2',
    'Ginger Dried Slices',
    'Dried ginger slices for tea and extraction.',
    'Spices',
    5000,
    100,
    62.81,
    'USD',
    10.0,
    ARRAY['https://image.pollinations.ai/prompt/Ginger%20Dried%20Slices%20Spices?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '8310cffd-52c8-41da-b3cb-c25f85adb31c',
    'c7d030b3-ca41-487a-829f-baf2809d9cf2',
    'Cardamom Pods',
    'White cardamom pods, dried and cleaned.',
    'Spices',
    5000,
    200,
    75.05,
    'USD',
    9.8,
    ARRAY['https://image.pollinations.ai/prompt/Cardamom%20Pods%20Spices?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '358e31c5-0608-48e8-858a-a88e51f7331b',
    'c7d030b3-ca41-487a-829f-baf2809d9cf2',
    'Seaweed Cottonii',
    'Dried seaweed Cottonii for carrageenan production.',
    'Seafood',
    2000,
    50,
    30.62,
    'USD',
    9.6,
    ARRAY['https://image.pollinations.ai/prompt/Seaweed%20Cottonii%20Seafood?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '7821f0cb-7c4f-4bb1-af27-93bb5bff4eee',
    'c7d030b3-ca41-487a-829f-baf2809d9cf2',
    'Frozen Yellowfin Tuna Loin',
    'Sashimi grade tuna loin, vacuum packed.',
    'Seafood',
    1000,
    100,
    107.35,
    'USD',
    8.2,
    ARRAY['https://image.pollinations.ai/prompt/Frozen%20Yellowfin%20Tuna%20Loin%20Seafood?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '2b572f3b-0f30-41db-b47c-619db0bc1f8b',
    '2e3a97f6-391b-499b-a00d-f78f0a756cac',
    'Instant Ginger Drink',
    'Sachet instant ginger drink with palm sugar.',
    'Processed Food',
    2000,
    200,
    137.12,
    'USD',
    8.4,
    ARRAY['https://image.pollinations.ai/prompt/Instant%20Ginger%20Drink%20Processed%20Food?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '50fdfd5d-0225-4716-bc17-a85dbfd7fa5b',
    '2e3a97f6-391b-499b-a00d-f78f0a756cac',
    'Raw Cashew Nuts',
    'Whole raw cashew nuts, W320 grade, from East Nusa Tenggara.',
    'Agriculture',
    500,
    200,
    124.65,
    'USD',
    9.1,
    ARRAY['https://image.pollinations.ai/prompt/Raw%20Cashew%20Nuts%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'def5d0df-204d-46fa-84e3-4dabfc5702b8',
    '2e3a97f6-391b-499b-a00d-f78f0a756cac',
    'Tempeh Chips',
    'Traditional fermented soybean chips, savory taste.',
    'Processed Food',
    5000,
    50,
    119.88,
    'USD',
    8.1,
    ARRAY['https://image.pollinations.ai/prompt/Tempeh%20Chips%20Processed%20Food?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '676b203a-b546-4f14-b986-8746e048b6a7',
    '2e3a97f6-391b-499b-a00d-f78f0a756cac',
    'Toraja Kalosi Coffee',
    'Clean, bright acidity with herbal and nutty notes from Sulawesi.',
    'Agriculture',
    1000,
    100,
    80.32,
    'USD',
    9.0,
    ARRAY['https://image.pollinations.ai/prompt/Toraja%20Kalosi%20Coffee%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'f900141d-886b-4214-b4b6-23507ea74d29',
    'dc9af0bf-c51d-451d-9737-6a673312321e',
    'Canned Sardines in Tomato Sauce',
    'High quality sardines, canned for export.',
    'Seafood',
    500,
    50,
    37.42,
    'USD',
    9.2,
    ARRAY['https://image.pollinations.ai/prompt/Canned%20Sardines%20in%20Tomato%20Sauce%20Seafood?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '12d552c1-a37e-4c46-9801-369853cb6d9e',
    'dc9af0bf-c51d-451d-9737-6a673312321e',
    'Frozen Yellowfin Tuna Loin',
    'Sashimi grade tuna loin, vacuum packed.',
    'Seafood',
    1000,
    50,
    47.94,
    'USD',
    9.1,
    ARRAY['https://image.pollinations.ai/prompt/Frozen%20Yellowfin%20Tuna%20Loin%20Seafood?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '2954bc01-ec2b-4daf-86a1-83fde9fb18ae',
    'dc9af0bf-c51d-451d-9737-6a673312321e',
    'Vannamei Shrimp Frozen',
    'IQF Vannamei shrimp, various sizes available.',
    'Seafood',
    1000,
    100,
    50.07,
    'USD',
    9.2,
    ARRAY['https://image.pollinations.ai/prompt/Vannamei%20Shrimp%20Frozen%20Seafood?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'fa7ec7ea-d6ee-45b2-a66b-70ac0d919ffc',
    'dc9af0bf-c51d-451d-9737-6a673312321e',
    'Soft Shell Crab',
    'Frozen soft shell crab, premium quality.',
    'Seafood',
    5000,
    100,
    84.04,
    'USD',
    9.6,
    ARRAY['https://image.pollinations.ai/prompt/Soft%20Shell%20Crab%20Seafood?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '1a706fd3-283b-4804-b45e-a9c934b597c1',
    '5cde7c37-c59d-4d23-bef3-54c777e90959',
    'Turmeric Powder',
    'High curcumin turmeric powder for food and health supplements.',
    'Spices',
    5000,
    100,
    18.38,
    'USD',
    8.5,
    ARRAY['https://image.pollinations.ai/prompt/Turmeric%20Powder%20Spices?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '2cdbbff1-fffd-4d75-9d7a-58046815efc4',
    '5cde7c37-c59d-4d23-bef3-54c777e90959',
    'Coconut Sugar',
    'Organic coconut sugar, low GI sweetener.',
    'Processed Food',
    1000,
    100,
    7.22,
    'USD',
    9.6,
    ARRAY['https://image.pollinations.ai/prompt/Coconut%20Sugar%20Processed%20Food?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '6464fe7c-7475-4a6e-b767-06d458513833',
    '5cde7c37-c59d-4d23-bef3-54c777e90959',
    'Instant Ginger Drink',
    'Sachet instant ginger drink with palm sugar.',
    'Processed Food',
    1000,
    200,
    95.05,
    'USD',
    8.4,
    ARRAY['https://image.pollinations.ai/prompt/Instant%20Ginger%20Drink%20Processed%20Food?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'a1b630e8-33d3-4dcd-9dfd-943b44582a04',
    '5cde7c37-c59d-4d23-bef3-54c777e90959',
    'Turmeric Powder',
    'High curcumin turmeric powder for food and health supplements.',
    'Spices',
    5000,
    100,
    22.0,
    'USD',
    9.3,
    ARRAY['https://image.pollinations.ai/prompt/Turmeric%20Powder%20Spices?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '3169f1e4-9307-4b7f-9766-e893bad818fa',
    '75c87aaa-3124-4113-9f90-b806d32dfe0e',
    'Rattan Divider Screen',
    'Decorative rattan room divider, 3 panels.',
    'Furniture',
    1000,
    100,
    144.2,
    'USD',
    8.3,
    ARRAY['https://image.pollinations.ai/prompt/Rattan%20Divider%20Screen%20Furniture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '1e6cc46f-f383-4ebc-91ba-331244b38280',
    '75c87aaa-3124-4113-9f90-b806d32dfe0e',
    'Eco-print Silk',
    'Natural eco-print on 100% silk fabric.',
    'Textile',
    500,
    200,
    5.68,
    'USD',
    9.4,
    ARRAY['https://image.pollinations.ai/prompt/Eco-print%20Silk%20Textile?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'b26eba2d-a10d-42bb-b610-ea85c2b1aab8',
    '75c87aaa-3124-4113-9f90-b806d32dfe0e',
    'Teak Outdoor Garden Table',
    'Weather-resistant teak wood table, perfect for patios and gardens.',
    'Furniture',
    5000,
    100,
    85.83,
    'USD',
    8.9,
    ARRAY['https://image.pollinations.ai/prompt/Teak%20Outdoor%20Garden%20Table%20Furniture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'd87a9931-05e4-4638-9f99-b2d440a48417',
    '75c87aaa-3124-4113-9f90-b806d32dfe0e',
    'Batik Cap Cotton',
    'Hand-stamped Batik fabric, vibrant colors, suitable for apparel.',
    'Textile',
    500,
    200,
    110.7,
    'USD',
    8.6,
    ARRAY['https://image.pollinations.ai/prompt/Batik%20Cap%20Cotton%20Textile?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '33320551-246e-4b18-a973-dd724fb4f3a0',
    '97dc3fd3-03b7-4862-a8d4-e6123dcb6efe',
    'Tenun Ikat Woven Fabric',
    'Traditional handwoven Tenun Ikat from Flores.',
    'Textile',
    500,
    50,
    143.25,
    'USD',
    9.3,
    ARRAY['https://image.pollinations.ai/prompt/Tenun%20Ikat%20Woven%20Fabric%20Textile?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '7cd47c2a-dd95-4163-80c2-6bc6e09cd63a',
    '97dc3fd3-03b7-4862-a8d4-e6123dcb6efe',
    'Tenun Ikat Woven Fabric',
    'Traditional handwoven Tenun Ikat from Flores.',
    'Textile',
    1000,
    200,
    134.62,
    'USD',
    9.0,
    ARRAY['https://image.pollinations.ai/prompt/Tenun%20Ikat%20Woven%20Fabric%20Textile?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '7332e74c-ddbf-48ee-8ff8-ec69477d3dad',
    '97dc3fd3-03b7-4862-a8d4-e6123dcb6efe',
    'Eco-print Silk',
    'Natural eco-print on 100% silk fabric.',
    'Textile',
    1000,
    200,
    54.13,
    'USD',
    8.3,
    ARRAY['https://image.pollinations.ai/prompt/Eco-print%20Silk%20Textile?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '541b6fc9-889e-4dd7-bd02-71bfafa7cf10',
    '97dc3fd3-03b7-4862-a8d4-e6123dcb6efe',
    'Tenun Ikat Woven Fabric',
    'Traditional handwoven Tenun Ikat from Flores.',
    'Textile',
    500,
    100,
    72.75,
    'USD',
    8.4,
    ARRAY['https://image.pollinations.ai/prompt/Tenun%20Ikat%20Woven%20Fabric%20Textile?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '61bfedbf-5cc4-4196-bf16-5a7c887fdd80',
    '288a74c0-41c5-4d83-b68e-5143746885fa',
    'Vetiver Oil',
    'Thick, amber vetiver oil from Garut roots.',
    'Essential Oils',
    2000,
    100,
    46.61,
    'USD',
    8.7,
    ARRAY['https://image.pollinations.ai/prompt/Vetiver%20Oil%20Essential%20Oils?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'f2a79412-7566-459e-8239-81ddc55c08a2',
    '288a74c0-41c5-4d83-b68e-5143746885fa',
    'Vanilla Beans Planifolia',
    'Gourmet grade vanilla beans, moisture 30-35%, rich flavor.',
    'Spices',
    5000,
    50,
    33.12,
    'USD',
    9.3,
    ARRAY['https://image.pollinations.ai/prompt/Vanilla%20Beans%20Planifolia%20Spices?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'a32a11e4-527c-4aed-b906-34ee999cc528',
    '288a74c0-41c5-4d83-b68e-5143746885fa',
    'Vetiver Oil',
    'Thick, amber vetiver oil from Garut roots.',
    'Essential Oils',
    2000,
    100,
    145.22,
    'USD',
    9.0,
    ARRAY['https://image.pollinations.ai/prompt/Vetiver%20Oil%20Essential%20Oils?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'f74d1dff-88f6-4cb8-a974-681c5ea10f68',
    '288a74c0-41c5-4d83-b68e-5143746885fa',
    'White Pepper Powder',
    'Pure Bangka white pepper powder, fine grind.',
    'Spices',
    5000,
    50,
    61.77,
    'USD',
    8.3,
    ARRAY['https://image.pollinations.ai/prompt/White%20Pepper%20Powder%20Spices?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '2fc6e142-946f-458f-a15a-880f17ae32e2',
    'cab9bcdf-41a8-4d14-8aaf-dd1dc33ae2e1',
    'Organic White Rice',
    'Premium organic white rice, long grain, pesticide-free.',
    'Agriculture',
    500,
    50,
    147.42,
    'USD',
    8.7,
    ARRAY['https://image.pollinations.ai/prompt/Organic%20White%20Rice%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '93033a29-186c-4879-8149-146b4779d7dc',
    'cab9bcdf-41a8-4d14-8aaf-dd1dc33ae2e1',
    'Betel Nuts (Areca)',
    'Whole dried betel nuts, split 80-85%, moisture <5%.',
    'Agriculture',
    5000,
    50,
    7.98,
    'USD',
    9.5,
    ARRAY['https://image.pollinations.ai/prompt/Betel%20Nuts%20%28Areca%29%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '7e1a0b72-71c8-43fd-9913-7fb728e7e3a1',
    'cab9bcdf-41a8-4d14-8aaf-dd1dc33ae2e1',
    'Robusta Lampung Coffee',
    'High caffeine content, strong body, perfect for espresso blends.',
    'Agriculture',
    1000,
    50,
    96.06,
    'USD',
    9.8,
    ARRAY['https://image.pollinations.ai/prompt/Robusta%20Lampung%20Coffee%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '84cc52ab-3a37-41d3-b749-87b4be4abe18',
    'cab9bcdf-41a8-4d14-8aaf-dd1dc33ae2e1',
    'Cocoa Beans Fermented',
    'High quality fermented cocoa beans, ready for chocolate production.',
    'Agriculture',
    500,
    50,
    67.66,
    'USD',
    9.8,
    ARRAY['https://image.pollinations.ai/prompt/Cocoa%20Beans%20Fermented%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '12fc264b-3077-46e3-b70a-4e02945cf23f',
    '0bc6434f-e94a-4ec7-baee-e4399cc1021d',
    'Seagrass Rug',
    'Handwoven seagrass rug, natural texture and color.',
    'Handicraft',
    1000,
    100,
    99.79,
    'USD',
    8.6,
    ARRAY['https://image.pollinations.ai/prompt/Seagrass%20Rug%20Handicraft?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '9dbafe77-b0d6-440d-9372-efca7e3c25ec',
    '0bc6434f-e94a-4ec7-baee-e4399cc1021d',
    'Coconut Shell Bowl',
    'Polished coconut shell bowls, eco-friendly dining ware.',
    'Handicraft',
    1000,
    50,
    50.71,
    'USD',
    8.1,
    ARRAY['https://image.pollinations.ai/prompt/Coconut%20Shell%20Bowl%20Handicraft?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '2eed2992-7d3c-43e1-8f6a-4d61e0c5815a',
    '0bc6434f-e94a-4ec7-baee-e4399cc1021d',
    'Seaweed Cottonii',
    'Dried seaweed Cottonii for carrageenan production.',
    'Seafood',
    5000,
    50,
    138.56,
    'USD',
    8.4,
    ARRAY['https://image.pollinations.ai/prompt/Seaweed%20Cottonii%20Seafood?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'e42b8f89-f5d0-457c-8a1a-54f931ac9aa9',
    '0bc6434f-e94a-4ec7-baee-e4399cc1021d',
    'Red Snapper Fillet',
    'Fresh frozen red snapper fillets, skin-on.',
    'Seafood',
    2000,
    50,
    26.88,
    'USD',
    8.4,
    ARRAY['https://image.pollinations.ai/prompt/Red%20Snapper%20Fillet%20Seafood?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '4e5181b9-3de1-481d-9cc0-37e52135f693',
    '180b8254-611e-4a60-955d-49769e2cb50d',
    'Suar Wood Slab Table',
    'Natural edge suar wood dining table, one-piece slab.',
    'Furniture',
    5000,
    50,
    31.7,
    'USD',
    9.9,
    ARRAY['https://image.pollinations.ai/prompt/Suar%20Wood%20Slab%20Table%20Furniture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'ad12669e-4a13-4f91-b57d-bfaaf72ff76e',
    '180b8254-611e-4a60-955d-49769e2cb50d',
    'Porang Chips (Konjac)',
    'Dried porang chips for glucomannan extraction. High purity.',
    'Agriculture',
    5000,
    200,
    114.77,
    'USD',
    9.6,
    ARRAY['https://image.pollinations.ai/prompt/Porang%20Chips%20%28Konjac%29%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '204ebc45-11c0-4525-a2d1-d823cf98494e',
    '180b8254-611e-4a60-955d-49769e2cb50d',
    'Toraja Kalosi Coffee',
    'Clean, bright acidity with herbal and nutty notes from Sulawesi.',
    'Agriculture',
    5000,
    50,
    3.36,
    'USD',
    9.3,
    ARRAY['https://image.pollinations.ai/prompt/Toraja%20Kalosi%20Coffee%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '64f49815-cf01-46da-8df2-09bc8a0fcc94',
    '180b8254-611e-4a60-955d-49769e2cb50d',
    'Rattan Lounge Chair',
    'Handwoven natural rattan chair with comfortable cushion.',
    'Furniture',
    1000,
    50,
    65.9,
    'USD',
    8.9,
    ARRAY['https://image.pollinations.ai/prompt/Rattan%20Lounge%20Chair%20Furniture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '26440945-a8a6-474a-85fa-0db15e00538d',
    '3545427c-5327-4957-be68-b25ef0836c37',
    'Nutmeg Oil',
    'Steam distilled nutmeg oil, spicy and sweet.',
    'Essential Oils',
    500,
    50,
    26.45,
    'USD',
    8.3,
    ARRAY['https://image.pollinations.ai/prompt/Nutmeg%20Oil%20Essential%20Oils?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'fa916341-28b1-49b6-b46f-76c26331b84a',
    '3545427c-5327-4957-be68-b25ef0836c37',
    'Citronella Oil',
    'Java citronella oil, natural insect repellent.',
    'Essential Oils',
    500,
    50,
    45.07,
    'USD',
    8.2,
    ARRAY['https://image.pollinations.ai/prompt/Citronella%20Oil%20Essential%20Oils?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'ee8efc31-0f1e-45bf-bda1-9570ffeeb611',
    '3545427c-5327-4957-be68-b25ef0836c37',
    'Patchouli Oil',
    'Dark patchouli oil, PA 30%+, strong earthy aroma.',
    'Essential Oils',
    2000,
    50,
    86.18,
    'USD',
    9.5,
    ARRAY['https://image.pollinations.ai/prompt/Patchouli%20Oil%20Essential%20Oils?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'fb902ccf-ae17-4c3c-a91b-89e8969cf9e9',
    '3545427c-5327-4957-be68-b25ef0836c37',
    'Clove Leaf Oil',
    'Distilled from clove leaves, high eugenol content.',
    'Essential Oils',
    500,
    200,
    129.22,
    'USD',
    8.5,
    ARRAY['https://image.pollinations.ai/prompt/Clove%20Leaf%20Oil%20Essential%20Oils?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '2eeea240-1fbc-4427-9ee6-39e4aea7d7e8',
    '54f5a131-4672-4220-a83c-9d74862d1823',
    'Red Snapper Fillet',
    'Fresh frozen red snapper fillets, skin-on.',
    'Seafood',
    1000,
    100,
    7.56,
    'USD',
    8.6,
    ARRAY['https://image.pollinations.ai/prompt/Red%20Snapper%20Fillet%20Seafood?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '2607d8a1-a546-44a7-b87e-5240fa643a8f',
    '54f5a131-4672-4220-a83c-9d74862d1823',
    'Canned Sardines in Tomato Sauce',
    'High quality sardines, canned for export.',
    'Seafood',
    2000,
    50,
    60.43,
    'USD',
    9.2,
    ARRAY['https://image.pollinations.ai/prompt/Canned%20Sardines%20in%20Tomato%20Sauce%20Seafood?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '3711a06a-1ff4-4b1a-a8a8-ca776a62de33',
    '54f5a131-4672-4220-a83c-9d74862d1823',
    'Soft Shell Crab',
    'Frozen soft shell crab, premium quality.',
    'Seafood',
    500,
    50,
    72.97,
    'USD',
    9.1,
    ARRAY['https://image.pollinations.ai/prompt/Soft%20Shell%20Crab%20Seafood?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '1dfc3cde-ed04-4979-9a65-66d0e1bf9a56',
    '54f5a131-4672-4220-a83c-9d74862d1823',
    'Soft Shell Crab',
    'Frozen soft shell crab, premium quality.',
    'Seafood',
    2000,
    50,
    120.47,
    'USD',
    8.0,
    ARRAY['https://image.pollinations.ai/prompt/Soft%20Shell%20Crab%20Seafood?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    'a6b6d414-fb6f-4655-9430-96e23cbadd8a',
    '84befe4e-7710-4184-bd72-4853e2d25c42',
    'Seagrass Rug',
    'Handwoven seagrass rug, natural texture and color.',
    'Handicraft',
    1000,
    200,
    38.18,
    'USD',
    8.3,
    ARRAY['https://image.pollinations.ai/prompt/Seagrass%20Rug%20Handicraft?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '8d2e960b-dc63-480b-b8c4-b925e9f08d24',
    '84befe4e-7710-4184-bd72-4853e2d25c42',
    'Gayo Arabica Green Beans',
    'Premium Grade 1 Arabica coffee beans from Gayo highlands. Moisture 12%.',
    'Agriculture',
    500,
    200,
    115.16,
    'USD',
    9.0,
    ARRAY['https://image.pollinations.ai/prompt/Gayo%20Arabica%20Green%20Beans%20Agriculture?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '821a9677-5ac2-4642-bf4d-3348658fe526',
    '84befe4e-7710-4184-bd72-4853e2d25c42',
    'Shell Mosaic Mirror',
    'Decorative mirror frame made from pearl shells.',
    'Handicraft',
    500,
    50,
    139.56,
    'USD',
    9.2,
    ARRAY['https://image.pollinations.ai/prompt/Shell%20Mosaic%20Mirror%20Handicraft?nologo=true']
);

INSERT INTO public.products (
    id, seller_id, name, description, category,
    capacity_per_month, moq, price_per_unit,
    currency, quality_score, images
) VALUES (
    '45cbe281-2a7c-40a1-bb6b-4cd5166e4186',
    '84befe4e-7710-4184-bd72-4853e2d25c42',
    'Macrame Wall Hanging',
    'Boho style macrame wall hanging, cotton rope.',
    'Handicraft',
    500,
    100,
    121.45,
    'USD',
    9.3,
    ARRAY['https://image.pollinations.ai/prompt/Macrame%20Wall%20Hanging%20Handicraft?nologo=true']
);

-- BUYING REQUESTS

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '7af1f841-57e5-4f0e-82f0-205d2e78e180',
    'f5af43b1-5fdf-44a1-9cce-061cc9794e17',
    'Healthy Snacks',
    'Looking for healthy vegetable and fruit chips.',
    'Processed Food',
    500,
    93.89,
    'Vietnam',
    '2026-03-19'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '36718354-6e9a-4959-847b-0e6e61c76d9d',
    'f5af43b1-5fdf-44a1-9cce-061cc9794e17',
    'Vanilla Beans Supplier',
    'Looking for premium vanilla beans for bakery supply.',
    'Spices',
    1000,
    70.84,
    'Vietnam',
    '2025-12-23'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'ed401747-efed-4624-9ded-101d78aeaeba',
    'f5af43b1-5fdf-44a1-9cce-061cc9794e17',
    'Dried Porang Chips',
    'Need supplier for dried porang chips, monthly 20 tons.',
    'Agriculture',
    500,
    93.01,
    'Vietnam',
    '2026-03-20'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '4f90ab05-a0d1-4c71-b8c9-8a551b520493',
    '6bdc776a-2809-4b0f-b250-824d7517c0ef',
    'Bamboo Furniture Wholesale',
    'Looking for wholesale supplier of bamboo chairs and tables.',
    'Furniture',
    100,
    7.17,
    'Djibouti',
    '2025-12-28'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '8af372d1-deb9-49ec-91ab-02bf6ef59a74',
    '6bdc776a-2809-4b0f-b250-824d7517c0ef',
    'Bamboo Products',
    'Seeking manufacturer of bamboo straws and cutlery.',
    'Handicraft',
    500,
    5.89,
    'Djibouti',
    '2025-12-06'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '573fc5a0-4681-438a-bd18-0ceb5d041a49',
    '6bdc776a-2809-4b0f-b250-824d7517c0ef',
    'Aromatherapy Ingredients',
    'Sourcing vetiver and nutmeg oil for aromatherapy blends.',
    'Essential Oils',
    1000,
    59.96,
    'Djibouti',
    '2025-12-09'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '4f724c16-fed3-4050-938c-b664fe60e7db',
    '4db3324a-3834-4c6d-9058-26469035096f',
    'Nutmeg and Mace',
    'Seeking supplier for high-grade nutmeg and mace.',
    'Spices',
    100,
    37.48,
    'Svalbard & Jan Mayen Islands',
    '2026-05-16'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '920b2672-9438-4ecd-9b23-c62a01a2d3a9',
    '4db3324a-3834-4c6d-9058-26469035096f',
    'Traditional Snacks',
    'Seeking supplier for Indonesian traditional snacks for export.',
    'Processed Food',
    500,
    83.4,
    'Svalbard & Jan Mayen Islands',
    '2026-03-01'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '6584e4ca-12ac-4039-86f5-abd5ff5184c5',
    '4db3324a-3834-4c6d-9058-26469035096f',
    'Home Decor Sourcing',
    'Looking for unique handmade home decor items.',
    'Handicraft',
    500,
    36.91,
    'Svalbard & Jan Mayen Islands',
    '2026-03-23'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'a2891355-4395-4d5c-85e2-5f0ae15c5250',
    '47156a87-88bb-4fe0-ac33-e2a7dd5f75f7',
    'Batik Fabric Wholesale',
    'Looking for supplier of printed and stamped batik fabrics.',
    'Textile',
    1000,
    6.37,
    'Paraguay',
    '2026-03-10'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '8b519982-23d3-4ad6-b880-43b4174ce3f1',
    '47156a87-88bb-4fe0-ac33-e2a7dd5f75f7',
    'Custom Tenun Weaving',
    'Seeking weavers for custom Tenun fabric production.',
    'Textile',
    1000,
    32.16,
    'Paraguay',
    '2026-02-06'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'be209a32-9132-464c-9280-eb7c5a98baa2',
    '47156a87-88bb-4fe0-ac33-e2a7dd5f75f7',
    'Batik Fabric Wholesale',
    'Looking for supplier of printed and stamped batik fabrics.',
    'Textile',
    1000,
    92.09,
    'Paraguay',
    '2026-04-04'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'a61150f2-a25d-40ca-b0ee-fa53e0c536fa',
    'a098b3d7-9233-4cd5-b024-1215963beb04',
    'Coconut Sugar Bulk',
    'Need organic coconut sugar in bulk packaging.',
    'Processed Food',
    1000,
    54.62,
    'Malaysia',
    '2026-03-30'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'f2677a17-62d1-460a-a2fc-8c2c10591d85',
    'a098b3d7-9233-4cd5-b024-1215963beb04',
    'Custom Tenun Weaving',
    'Seeking weavers for custom Tenun fabric production.',
    'Textile',
    1000,
    77.03,
    'Malaysia',
    '2026-02-12'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '5a7b3186-0006-4072-986f-77e0e6203a14',
    'a098b3d7-9233-4cd5-b024-1215963beb04',
    'Shrimp Exporter Wanted',
    'Seeking processor for frozen Vannamei shrimp.',
    'Seafood',
    1000,
    81.61,
    'Malaysia',
    '2026-04-19'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'ef468946-d620-447e-b4fa-2544be72e630',
    '94af2e74-6f40-4d22-868c-e1917a6f550f',
    'Home Decor Sourcing',
    'Looking for unique handmade home decor items.',
    'Handicraft',
    500,
    49.01,
    'Guam',
    '2026-05-12'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'a7ce3aff-60ed-409e-8518-267838e53071',
    '94af2e74-6f40-4d22-868c-e1917a6f550f',
    'Canned Fish Distributor',
    'Looking for canned sardines and tuna for retail distribution.',
    'Seafood',
    500,
    94.82,
    'Guam',
    '2026-04-28'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '4fa6d796-61b4-4e50-bd77-32464686c693',
    '94af2e74-6f40-4d22-868c-e1917a6f550f',
    'Custom Tenun Weaving',
    'Seeking weavers for custom Tenun fabric production.',
    'Textile',
    100,
    57.03,
    'Guam',
    '2026-04-09'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'f835c0dd-4389-43d6-adee-e6cc42302278',
    '9d21fb32-5489-4fb1-9c7e-27f8bdb7bbf4',
    'Traditional Snacks',
    'Seeking supplier for Indonesian traditional snacks for export.',
    'Processed Food',
    100,
    79.89,
    'Bahamas',
    '2026-03-15'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '2599c139-38ca-4b64-ad71-d445f0d6bb36',
    '9d21fb32-5489-4fb1-9c7e-27f8bdb7bbf4',
    'Coconut Sugar Bulk',
    'Need organic coconut sugar in bulk packaging.',
    'Processed Food',
    100,
    55.12,
    'Bahamas',
    '2026-03-12'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '8b4ab5b4-9799-462b-9dfe-342a30a355c7',
    '9d21fb32-5489-4fb1-9c7e-27f8bdb7bbf4',
    'Patchouli Oil for Perfumery',
    'Looking for high quality patchouli oil for perfume industry.',
    'Essential Oils',
    1000,
    91.72,
    'Bahamas',
    '2026-05-24'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '2acdc315-93f9-4ea3-b126-94bec443741f',
    'ffa8eb1a-49e8-4e10-9473-1e8fcb79940f',
    'Sustainable Fabrics',
    'Looking for eco-friendly fabrics like organic cotton and bamboo.',
    'Textile',
    100,
    65.85,
    'Burundi',
    '2026-05-07'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '4fbf9499-9471-45df-9d15-c21f57ed0857',
    'ffa8eb1a-49e8-4e10-9473-1e8fcb79940f',
    'Vanilla Beans Supplier',
    'Looking for premium vanilla beans for bakery supply.',
    'Spices',
    500,
    77.33,
    'Burundi',
    '2026-01-31'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '36b9065b-47fb-499d-aaa6-08ed35fc28f8',
    'ffa8eb1a-49e8-4e10-9473-1e8fcb79940f',
    'Cinnamon Sticks Export',
    'Need container load of Cassia cinnamon sticks.',
    'Spices',
    1000,
    9.23,
    'Burundi',
    '2026-03-03'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '51ca3c1c-596f-4ca0-a0f1-62787af3b953',
    '1afa0c20-0bd9-433b-a2cb-05341a1ae1fc',
    'Home Decor Sourcing',
    'Looking for unique handmade home decor items.',
    'Handicraft',
    500,
    62.01,
    'India',
    '2026-04-15'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'b12da8ef-a05f-4949-a9b8-d197e1ca09bf',
    '1afa0c20-0bd9-433b-a2cb-05341a1ae1fc',
    'Patchouli Oil for Perfumery',
    'Looking for high quality patchouli oil for perfume industry.',
    'Essential Oils',
    100,
    17.86,
    'India',
    '2026-03-31'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '2c439509-d2d0-4b65-a991-85ff6c6e1eaf',
    '1afa0c20-0bd9-433b-a2cb-05341a1ae1fc',
    'Rayon Fabric Supplier',
    'Need consistent supply of rayon viscose for garment factory.',
    'Textile',
    500,
    53.01,
    'India',
    '2026-05-29'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'c4b69405-a27e-40f8-a76f-08cda64f82e6',
    'ab4e96e4-7c19-4a88-9d19-5106e0853fb9',
    'Coconut Sugar Bulk',
    'Need organic coconut sugar in bulk packaging.',
    'Processed Food',
    500,
    70.94,
    'Cambodia',
    '2025-12-06'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '80a537ed-30e5-4480-b090-34ec9c1ef292',
    'ab4e96e4-7c19-4a88-9d19-5106e0853fb9',
    'Batik Fabric Wholesale',
    'Looking for supplier of printed and stamped batik fabrics.',
    'Textile',
    1000,
    99.97,
    'Cambodia',
    '2025-12-19'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '7b0bd4da-6483-41a3-9701-cd896df3a994',
    'ab4e96e4-7c19-4a88-9d19-5106e0853fb9',
    'Hotel Project Furniture',
    'Need complete furniture set for 50-room boutique hotel.',
    'Furniture',
    500,
    69.26,
    'Cambodia',
    '2026-03-08'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '1c88e4cb-a149-41fb-8043-d9e9b2c1b454',
    '2fe55eeb-58c8-4acd-aa9d-7782c0bfd470',
    'Shrimp Exporter Wanted',
    'Seeking processor for frozen Vannamei shrimp.',
    'Seafood',
    1000,
    53.65,
    'Croatia',
    '2026-01-11'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '78f6dbdf-8835-48fe-a37a-def9a3d92ffe',
    '2fe55eeb-58c8-4acd-aa9d-7782c0bfd470',
    'Rayon Fabric Supplier',
    'Need consistent supply of rayon viscose for garment factory.',
    'Textile',
    500,
    94.73,
    'Croatia',
    '2026-03-29'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '2bf9f3bf-6e71-42ca-8f68-ef201da68cfa',
    '2fe55eeb-58c8-4acd-aa9d-7782c0bfd470',
    'Coconut Sugar Bulk',
    'Need organic coconut sugar in bulk packaging.',
    'Processed Food',
    1000,
    13.55,
    'Croatia',
    '2026-05-29'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '06dfa3eb-71cb-4257-ab10-18d505d7445f',
    '3fd17f01-37c8-4079-a772-5dc6d6dd14e0',
    'Supplier for Cocoa Beans',
    'Seeking long-term partner for fermented cocoa beans supply.',
    'Agriculture',
    1000,
    24.83,
    'Zimbabwe',
    '2025-12-05'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '2f30d9c1-0101-45a2-98ee-465e2f31bb0e',
    '3fd17f01-37c8-4079-a772-5dc6d6dd14e0',
    'Coconut Sugar Bulk',
    'Need organic coconut sugar in bulk packaging.',
    'Processed Food',
    1000,
    25.07,
    'Zimbabwe',
    '2026-05-17'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '3c9a0fca-3fe3-4c2a-9a9d-8e56555b1417',
    '3fd17f01-37c8-4079-a772-5dc6d6dd14e0',
    'Robusta Coffee Supplier',
    'Looking for reliable supplier of Lampung Robusta coffee.',
    'Agriculture',
    100,
    24.72,
    'Zimbabwe',
    '2025-12-10'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'f628091a-281e-4e1d-830a-2893bdb947e2',
    '62c1ce81-32fd-495d-83f1-f23962a0a9d8',
    'Rayon Fabric Supplier',
    'Need consistent supply of rayon viscose for garment factory.',
    'Textile',
    500,
    86.19,
    'Gibraltar',
    '2025-12-09'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '74bfc84c-4736-4e1c-a6c0-595d21fed90b',
    '62c1ce81-32fd-495d-83f1-f23962a0a9d8',
    'Frozen Tuna Supplier',
    'Looking for monthly supply of frozen tuna loins.',
    'Seafood',
    100,
    5.59,
    'Gibraltar',
    '2026-05-24'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'fd522f01-faa8-4c39-8599-88aa0d081d53',
    '62c1ce81-32fd-495d-83f1-f23962a0a9d8',
    'Healthy Snacks',
    'Looking for healthy vegetable and fruit chips.',
    'Processed Food',
    500,
    14.48,
    'Gibraltar',
    '2026-01-31'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'c41e4e98-f0ff-4bea-9eef-f3d5172b894e',
    '8b24c804-a623-48d6-a8cc-bb6819a2bb26',
    'Eco-friendly Handicrafts',
    'Looking for sustainable home decor and kitchenware.',
    'Handicraft',
    1000,
    84.87,
    'Australia',
    '2026-04-07'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '61833b9f-42da-4b57-84f3-c1708c14ec01',
    '8b24c804-a623-48d6-a8cc-bb6819a2bb26',
    'Custom Wood Furniture',
    'Seeking artisan for custom solid wood furniture production.',
    'Furniture',
    500,
    58.06,
    'Australia',
    '2026-01-24'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '00467eaf-8caf-496a-baa0-379824aca454',
    '8b24c804-a623-48d6-a8cc-bb6819a2bb26',
    'Patchouli Oil for Perfumery',
    'Looking for high quality patchouli oil for perfume industry.',
    'Essential Oils',
    100,
    59.28,
    'Australia',
    '2026-05-03'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '26e4bfa7-0245-49c2-9633-f9413a5a112a',
    '5eb2d4eb-911c-4cd6-a55b-91398453ef0b',
    'Custom Tenun Weaving',
    'Seeking weavers for custom Tenun fabric production.',
    'Textile',
    1000,
    13.64,
    'Ireland',
    '2025-12-27'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '04bbf340-da07-404c-b1a4-763cc46941f9',
    '5eb2d4eb-911c-4cd6-a55b-91398453ef0b',
    'Bamboo Furniture Wholesale',
    'Looking for wholesale supplier of bamboo chairs and tables.',
    'Furniture',
    100,
    43.11,
    'Ireland',
    '2026-04-30'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '583546e7-8a79-476b-8ee4-196e598bbc63',
    '5eb2d4eb-911c-4cd6-a55b-91398453ef0b',
    'Healthy Snacks',
    'Looking for healthy vegetable and fruit chips.',
    'Processed Food',
    500,
    29.05,
    'Ireland',
    '2026-05-28'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '1b0c88a3-7ef9-4b80-b90d-d4c32a878d08',
    '4d3aeff1-694d-4f7b-a4da-c9f8008f99a0',
    'Coconut Sugar Bulk',
    'Need organic coconut sugar in bulk packaging.',
    'Processed Food',
    1000,
    41.8,
    'Romania',
    '2026-04-23'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '8c306ad3-e8fc-42a4-99b4-b721cdf2174a',
    '4d3aeff1-694d-4f7b-a4da-c9f8008f99a0',
    'Hotel Project Furniture',
    'Need complete furniture set for 50-room boutique hotel.',
    'Furniture',
    1000,
    37.53,
    'Romania',
    '2026-03-27'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '27de47e3-0796-4816-8128-6b3e2da00738',
    '4d3aeff1-694d-4f7b-a4da-c9f8008f99a0',
    'Frozen Tuna Supplier',
    'Looking for monthly supply of frozen tuna loins.',
    'Seafood',
    100,
    27.35,
    'Romania',
    '2026-04-21'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '478841b2-fdcf-415b-ba0b-6680c019fe78',
    '1cc01c59-a386-48bb-947a-8e1dc2393bf4',
    'Sustainable Fabrics',
    'Looking for eco-friendly fabrics like organic cotton and bamboo.',
    'Textile',
    1000,
    69.62,
    'Turkey',
    '2025-12-08'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '29ab4a3d-7526-4b15-9f1e-7c2ba95a9770',
    '1cc01c59-a386-48bb-947a-8e1dc2393bf4',
    'Dried Seaweed',
    'Need supplier for dried seaweed Cottonii.',
    'Seafood',
    100,
    88.92,
    'Turkey',
    '2026-03-22'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '7740befd-5341-42e5-a4a1-8590dcef258c',
    '1cc01c59-a386-48bb-947a-8e1dc2393bf4',
    'Home Decor Sourcing',
    'Looking for unique handmade home decor items.',
    'Handicraft',
    100,
    61.43,
    'Turkey',
    '2026-04-12'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'cd7188cf-53f0-4001-89c1-ff2978ad8da0',
    '94e4c54b-a8f5-452b-b679-129b39a4c65e',
    'Dried Seaweed',
    'Need supplier for dried seaweed Cottonii.',
    'Seafood',
    500,
    98.66,
    'Bouvet Island (Bouvetoya)',
    '2026-01-17'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '41cadaf0-f95c-466f-9b40-dd9ef00232f8',
    '94e4c54b-a8f5-452b-b679-129b39a4c65e',
    'Patchouli Oil for Perfumery',
    'Looking for high quality patchouli oil for perfume industry.',
    'Essential Oils',
    500,
    54.71,
    'Bouvet Island (Bouvetoya)',
    '2025-12-04'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'ff520d01-e467-4509-9e7a-c11829e83f5d',
    '94e4c54b-a8f5-452b-b679-129b39a4c65e',
    'Cinnamon Sticks Export',
    'Need container load of Cassia cinnamon sticks.',
    'Spices',
    100,
    47.39,
    'Bouvet Island (Bouvetoya)',
    '2026-03-15'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'fc4270ba-3b6a-47d4-a557-6a58dea42692',
    '62a7f2af-f36e-45f9-815e-865897ff3259',
    'Dried Seaweed',
    'Need supplier for dried seaweed Cottonii.',
    'Seafood',
    500,
    77.27,
    'Puerto Rico',
    '2026-01-16'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'd9d84f15-e28c-4d16-9423-da7a8029a56e',
    '62a7f2af-f36e-45f9-815e-865897ff3259',
    'Rayon Fabric Supplier',
    'Need consistent supply of rayon viscose for garment factory.',
    'Textile',
    500,
    26.09,
    'Puerto Rico',
    '2026-01-28'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '2ef51559-dabe-4769-83a4-b6f1afaf6382',
    '62a7f2af-f36e-45f9-815e-865897ff3259',
    'Cinnamon Sticks Export',
    'Need container load of Cassia cinnamon sticks.',
    'Spices',
    100,
    85.24,
    'Puerto Rico',
    '2026-01-31'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '310d80ef-53bd-47dd-a53e-8a465d34adec',
    'e9480aab-7207-402d-a6ce-ef21f331027b',
    'Patchouli Oil for Perfumery',
    'Looking for high quality patchouli oil for perfume industry.',
    'Essential Oils',
    1000,
    70.59,
    'Hungary',
    '2025-12-16'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '5590e17b-9f7c-41f6-a258-43465c0f81b6',
    'e9480aab-7207-402d-a6ce-ef21f331027b',
    'Dried Seaweed',
    'Need supplier for dried seaweed Cottonii.',
    'Seafood',
    1000,
    21.32,
    'Hungary',
    '2026-01-04'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '69fdf928-551b-4d8a-92c9-7b707db487da',
    'e9480aab-7207-402d-a6ce-ef21f331027b',
    'Bulk Cloves Supplier',
    'Looking for 1 ton of dried cloves for spice extraction.',
    'Spices',
    100,
    25.01,
    'Hungary',
    '2026-01-28'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '99480923-63d7-4dc5-8fab-66310accc2e6',
    'e19bd4b7-c743-4c2e-b6b6-6e026346ac46',
    'Rayon Fabric Supplier',
    'Need consistent supply of rayon viscose for garment factory.',
    'Textile',
    1000,
    88.1,
    'Cameroon',
    '2026-05-17'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '609ac011-8710-4d07-8ac9-fcfb73c47bc6',
    'e19bd4b7-c743-4c2e-b6b6-6e026346ac46',
    'Supplier for Cocoa Beans',
    'Seeking long-term partner for fermented cocoa beans supply.',
    'Agriculture',
    1000,
    14.29,
    'Cameroon',
    '2026-03-27'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '213e0ce6-c841-4748-a518-80543cc718d3',
    'e19bd4b7-c743-4c2e-b6b6-6e026346ac46',
    'Supplier for Cocoa Beans',
    'Seeking long-term partner for fermented cocoa beans supply.',
    'Agriculture',
    1000,
    95.15,
    'Cameroon',
    '2026-03-25'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '41b931cc-2c05-47e3-8068-7ad399d321ce',
    '845c8b53-52f1-4e2c-bbab-75699dbff3b9',
    'Traditional Snacks',
    'Seeking supplier for Indonesian traditional snacks for export.',
    'Processed Food',
    100,
    70.46,
    'Slovenia',
    '2026-01-31'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '9983012a-fa4c-4948-b4d2-c68433dbe2b4',
    '845c8b53-52f1-4e2c-bbab-75699dbff3b9',
    'Essential Oil Bulk',
    'Need bulk supply of clove and citronella oil.',
    'Essential Oils',
    1000,
    35.1,
    'Slovenia',
    '2026-01-10'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'bcbef7dc-b499-4333-be9d-115811b7d10c',
    '845c8b53-52f1-4e2c-bbab-75699dbff3b9',
    'Aromatherapy Ingredients',
    'Sourcing vetiver and nutmeg oil for aromatherapy blends.',
    'Essential Oils',
    500,
    56.62,
    'Slovenia',
    '2025-12-21'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '4f48da8b-7fed-43a2-8f33-7f2533fb95d6',
    '81aadc41-159e-4194-b641-771fd2f8ba73',
    'Teak Outdoor Furniture',
    'Looking for manufacturer of teak garden furniture sets.',
    'Furniture',
    1000,
    33.15,
    'Dominican Republic',
    '2026-01-14'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '50713bf3-3ec7-4889-b1a1-fc267e873ccf',
    '81aadc41-159e-4194-b641-771fd2f8ba73',
    'Traditional Snacks',
    'Seeking supplier for Indonesian traditional snacks for export.',
    'Processed Food',
    100,
    74.24,
    'Dominican Republic',
    '2026-05-08'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'dcbe0d91-ec75-4da2-9a36-3ca13e28f073',
    '81aadc41-159e-4194-b641-771fd2f8ba73',
    'Bulk Raw Cashew Nuts',
    'Requirement for 10 tons of raw cashew nuts monthly.',
    'Agriculture',
    500,
    46.96,
    'Dominican Republic',
    '2026-04-11'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '146383ce-4bbb-465a-aed5-022e453c77a0',
    '493de775-08db-4d51-b3c1-01afc0d439a0',
    'Canned Fish Distributor',
    'Looking for canned sardines and tuna for retail distribution.',
    'Seafood',
    1000,
    86.25,
    'Kazakhstan',
    '2026-04-16'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'd330b7d4-8022-4603-b351-a1ff534812bd',
    '493de775-08db-4d51-b3c1-01afc0d439a0',
    'Rattan Chair Supplier',
    'Need 200 units of rattan lounge chairs for a hotel project.',
    'Furniture',
    1000,
    26.74,
    'Kazakhstan',
    '2025-12-25'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '4902d515-fc6c-4e13-95aa-0474f4356ffb',
    '493de775-08db-4d51-b3c1-01afc0d439a0',
    'Patchouli Oil for Perfumery',
    'Looking for high quality patchouli oil for perfume industry.',
    'Essential Oils',
    100,
    50.46,
    'Kazakhstan',
    '2026-01-01'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '7858516f-af24-43ea-9c68-a949a506b0e1',
    '0266f2ec-5a1b-40df-9ba1-18be6fb08173',
    'Batik Fabric Wholesale',
    'Looking for supplier of printed and stamped batik fabrics.',
    'Textile',
    500,
    93.47,
    'Jamaica',
    '2026-02-07'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '9cde0455-a0a8-49da-a890-5f322d99a66e',
    '0266f2ec-5a1b-40df-9ba1-18be6fb08173',
    'Home Decor Sourcing',
    'Looking for unique handmade home decor items.',
    'Handicraft',
    100,
    11.09,
    'Jamaica',
    '2025-12-08'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'a65d87fe-022a-445d-899d-cb826e33c0b8',
    '0266f2ec-5a1b-40df-9ba1-18be6fb08173',
    'Dried Seaweed',
    'Need supplier for dried seaweed Cottonii.',
    'Seafood',
    100,
    67.27,
    'Jamaica',
    '2025-12-06'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '0a2ab5ab-6062-4341-a29f-e5545af96f74',
    '8657f046-5430-4506-8871-01a3e92400f4',
    'Healthy Snacks',
    'Looking for healthy vegetable and fruit chips.',
    'Processed Food',
    100,
    69.29,
    'Gabon',
    '2026-01-04'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'd121f6c4-ba27-4b08-93b5-c32da5202b8b',
    '8657f046-5430-4506-8871-01a3e92400f4',
    'Essential Oil Bulk',
    'Need bulk supply of clove and citronella oil.',
    'Essential Oils',
    1000,
    85.02,
    'Gabon',
    '2025-12-06'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '2aaa9032-5bc6-43b6-94ed-25ff4bc27d6c',
    '8657f046-5430-4506-8871-01a3e92400f4',
    'Rayon Fabric Supplier',
    'Need consistent supply of rayon viscose for garment factory.',
    'Textile',
    1000,
    80.86,
    'Gabon',
    '2026-03-15'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '7aa45c3a-bd1f-4be6-9ed4-5993669666af',
    'bff4f9c8-e22d-4df6-a47d-34790d4bfa81',
    'Shrimp Exporter Wanted',
    'Seeking processor for frozen Vannamei shrimp.',
    'Seafood',
    100,
    92.45,
    'Niue',
    '2025-12-08'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'a1d9a168-0a8b-45db-8278-1a2cba5ea1fa',
    'bff4f9c8-e22d-4df6-a47d-34790d4bfa81',
    'Custom Wood Furniture',
    'Seeking artisan for custom solid wood furniture production.',
    'Furniture',
    500,
    61.86,
    'Niue',
    '2026-05-25'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'f4efd3b5-15ac-45ab-bce2-a64d09c57854',
    'bff4f9c8-e22d-4df6-a47d-34790d4bfa81',
    'Bamboo Furniture Wholesale',
    'Looking for wholesale supplier of bamboo chairs and tables.',
    'Furniture',
    1000,
    98.11,
    'Niue',
    '2026-04-01'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'f4b3270f-0968-4950-a955-d648f91295e0',
    '2c1bd39b-8256-4bbb-be68-96ca153d88b3',
    'Healthy Snacks',
    'Looking for healthy vegetable and fruit chips.',
    'Processed Food',
    1000,
    31.19,
    'Lebanon',
    '2026-03-20'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '4e369e0d-4390-4caa-b1b5-f3f8c82dc636',
    '2c1bd39b-8256-4bbb-be68-96ca153d88b3',
    'Custom Wood Furniture',
    'Seeking artisan for custom solid wood furniture production.',
    'Furniture',
    500,
    70.9,
    'Lebanon',
    '2026-02-06'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '6fb225c1-b89d-47d6-8d12-15bccbc7be50',
    '2c1bd39b-8256-4bbb-be68-96ca153d88b3',
    'Frozen Tuna Supplier',
    'Looking for monthly supply of frozen tuna loins.',
    'Seafood',
    100,
    91.21,
    'Lebanon',
    '2026-01-08'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '7cda0ecf-e4c2-4a1e-af24-e3c97ecfa94f',
    '9b280eed-ba62-4947-abd0-8541655e5970',
    'Dried Seaweed',
    'Need supplier for dried seaweed Cottonii.',
    'Seafood',
    1000,
    34.26,
    'Lao People''s Democratic Republic',
    '2026-03-20'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'f6bcac21-77cb-487f-9a42-a45147038f3e',
    '9b280eed-ba62-4947-abd0-8541655e5970',
    'Traditional Snacks',
    'Seeking supplier for Indonesian traditional snacks for export.',
    'Processed Food',
    100,
    99.41,
    'Lao People''s Democratic Republic',
    '2026-05-29'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'c5e7681b-93e7-41fa-a7a2-3f3722051eaa',
    '9b280eed-ba62-4947-abd0-8541655e5970',
    'Dried Seaweed',
    'Need supplier for dried seaweed Cottonii.',
    'Seafood',
    1000,
    93.65,
    'Lao People''s Democratic Republic',
    '2026-02-11'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'faa4c9b7-35a6-4314-9878-5e25ae3a4d3e',
    '3484e600-73c0-4ac9-9095-9065b925dbf9',
    'Shrimp Exporter Wanted',
    'Seeking processor for frozen Vannamei shrimp.',
    'Seafood',
    100,
    10.49,
    'South Africa',
    '2026-04-07'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    '19cf4f24-37f0-4481-bda7-22e15e8df72f',
    '3484e600-73c0-4ac9-9095-9065b925dbf9',
    'Bamboo Furniture Wholesale',
    'Looking for wholesale supplier of bamboo chairs and tables.',
    'Furniture',
    500,
    5.94,
    'South Africa',
    '2026-01-06'
);

INSERT INTO public.buying_requests (
    id, buyer_id, title, description,
    category, required_qty, target_price,
    destination_country, deadline
) VALUES (
    'be0be17d-dc25-43df-8700-3e0f64d206e6',
    '3484e600-73c0-4ac9-9095-9065b925dbf9',
    'Home Decor Sourcing',
    'Looking for unique handmade home decor items.',
    'Handicraft',
    100,
    76.48,
    'South Africa',
    '2026-02-23'
);
