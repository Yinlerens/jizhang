---
url: "https://supabase.com/docs/reference/self-hosting-auth/deletes-a-user"
title: "Self-Hosting | Supabase Docs"
---

[![Supabase wordmark](https://supabase.com/docs/supabase-dark.svg)![Supabase wordmark](https://supabase.com/docs/supabase-light.svg)DOCS](https://supabase.com/docs)

- [Start](https://supabase.com/docs/guides/getting-started)
- Products
- Build
- Manage
- Reference
- Resources

[![Supabase wordmark](https://supabase.com/docs/supabase-dark.svg)![Supabase wordmark](https://supabase.com/docs/supabase-light.svg)DOCS](https://supabase.com/docs)

Search docs...

K

[Sign up](https://supabase.com/dashboard)

Main menu

Self-Hosting Auth

- [Introduction](https://supabase.com/docs/reference/self-hosting-auth/introduction)
- * * *


Usage

  - [Generates an email action link](https://supabase.com/docs/reference/self-hosting-auth/generates-an-email-action-link)
  - [Get a user](https://supabase.com/docs/reference/self-hosting-auth/get-a-user)
  - [Update a user](https://supabase.com/docs/reference/self-hosting-auth/update-a-user)
  - [Deletes a user](https://supabase.com/docs/reference/self-hosting-auth/deletes-a-user)
  - [List all users](https://supabase.com/docs/reference/self-hosting-auth/list-all-users)
  - [Returns the created user](https://supabase.com/docs/reference/self-hosting-auth/returns-the-created-user)
  - [Receives the redirect from an external provider during the oauth authentication process starts the process of creating an access and refresh token](https://supabase.com/docs/reference/self-hosting-auth/receives-the-redirect-from-an-external-provider-during-the-oauth-authentication-process-starts-the-process-of-creating-an-access-and-refresh-token)
  - [The healthcheck endpoint for gotrue returns the current gotrue version](https://supabase.com/docs/reference/self-hosting-auth/the-healthcheck-endpoint-for-gotrue-returns-the-current-gotrue-version)
  - [Sends an invite link to the user](https://supabase.com/docs/reference/self-hosting-auth/sends-an-invite-link-to-the-user)
  - [Logs out the user](https://supabase.com/docs/reference/self-hosting-auth/logs-out-the-user)
  - [Passwordless sign in method for email or phone](https://supabase.com/docs/reference/self-hosting-auth/passwordless-sign-in-method-for-email-or-phone)
  - [Sends a password recovery email link to the users email](https://supabase.com/docs/reference/self-hosting-auth/sends-a-password-recovery-email-link-to-the-users-email)
  - [Returns the configuration settings for the gotrue server](https://supabase.com/docs/reference/self-hosting-auth/returns-the-configuration-settings-for-the-gotrue-server)
  - [Password based signup with either email or phone](https://supabase.com/docs/reference/self-hosting-auth/password-based-signup-with-either-email-or-phone)
  - [Signs in a user with a password](https://supabase.com/docs/reference/self-hosting-auth/signs-in-a-user-with-a-password)
  - [Refreshes a users refresh token](https://supabase.com/docs/reference/self-hosting-auth/refreshes-a-users-refresh-token)
  - [Get information for the logged in user](https://supabase.com/docs/reference/self-hosting-auth/get-information-for-the-logged-in-user)
  - [Returns the updated user](https://supabase.com/docs/reference/self-hosting-auth/returns-the-updated-user)
  - [Verifies a sign up](https://supabase.com/docs/reference/self-hosting-auth/verifies-a-sign-up)

[![Supabase wordmark](https://supabase.com/docs/supabase-dark.svg)![Supabase wordmark](https://supabase.com/docs/supabase-light.svg)DOCS](https://supabase.com/docs)

- [Start](https://supabase.com/docs/guides/getting-started)
- Products
- Build
- Manage
- Reference
- Resources

[![Supabase wordmark](https://supabase.com/docs/supabase-dark.svg)![Supabase wordmark](https://supabase.com/docs/supabase-light.svg)DOCS](https://supabase.com/docs)

Search docs...

K

[Sign up](https://supabase.com/dashboard)

Auth Server Reference

# Self-Hosting Auth

The Supabase Auth Server (GoTrue) is a JSON Web Token (JWT)-based API for managing users and issuing access tokens.

GoTrue is an open-source API written in Golang, that acts as a self-standing API service for handling user registration and authentication for JAM projects. It's based on OAuth2 and JWT and handles user signup, authentication, and custom user data.

### Client libraries [\#](https://supabase.com/docs/reference/self-hosting-auth/deletes-a-user\#client-libraries)

- [JavaScript](https://github.com/supabase/gotrue-js)
- [Dart](https://github.com/supabase/gotrue-dart)

### Additional links [\#](https://supabase.com/docs/reference/self-hosting-auth/deletes-a-user\#additional-links)

- [Source code](https://github.com/supabase/gotrue)
- [Known bugs and issues](https://github.com/supabase/gotrue/issues)
- [Auth guides](https://supabase.com/docs/guides/auth)

* * *

## Generates an email action link.

post`/admin/generate_link`

### Body

application/json

- data

Optional

object

Object schema

- email

Optional

string

- new\_email

Optional

string

- password

Optional

string

- redirect\_to

Optional

string

- type

Optional

string


### Response codes

- 200
- 401

### Response (200)

exampleschema

```
1
{
2
  "action_link": "lorem",
3
  "app_metadata": {
4
    "property1": null,
5
    "property2": null
6
  },
7
  "aud": "lorem",
8
  "banned_until": "2021-12-31T23:34:00Z",
9
  "confirmation_sent_at": "2021-12-31T23:34:00Z",
10
  "confirmed_at": "2021-12-31T23:34:00Z",
11
  "created_at": "2021-12-31T23:34:00Z",
12
  "email": "lorem",
13
  "email_change_sent_at": "2021-12-31T23:34:00Z",
14
  "email_confirmed_at": "2021-12-31T23:34:00Z",
15
  "email_otp": "lorem",
16
  "hashed_token": "lorem",
17
  "id": "fbdf5a53-161e-4460-98ad-0e39408d8689",
18
  "identities": [\
19\
    {\
20\
      "created_at": "2021-12-31T23:34:00Z",\
21\
      "id": "lorem",\
22\
      "identity_data": {\
23\
        "property1": null,\
24\
        "property2": null\
25\
      },\
26\
      "last_sign_in_at": "2021-12-31T23:34:00Z",\
27\
      "provider": "lorem",\
28\
      "updated_at": "2021-12-31T23:34:00Z",\
29\
      "user_id": "fbdf5a53-161e-4460-98ad-0e39408d8689"\
30\
    }\
31\
  ],
32
  "invited_at": "2021-12-31T23:34:00Z",
33
  "last_sign_in_at": "2021-12-31T23:34:00Z",
34
  "new_email": "lorem",
35
  "new_phone": "lorem",
36
  "phone": "lorem",
37
  "phone_change_sent_at": "2021-12-31T23:34:00Z",
38
  "phone_confirmed_at": "2021-12-31T23:34:00Z",
39
  "reauthentication_sent_at": "2021-12-31T23:34:00Z",
40
  "recovery_sent_at": "2021-12-31T23:34:00Z",
41
  "redirect_to": "lorem",
42
  "role": "lorem",
43
  "updated_at": "2021-12-31T23:34:00Z",
44
  "user_metadata": {
45
    "property1": null,
46
    "property2": null
47
  },
48
  "verification_type": "lorem"
49
}
```

* * *

## Get a user.

get`/admin/user/{user_id}`

### Path parameters

- user\_id

Required





The user's id


### Response codes

- 200
- 401

### Response (200)

exampleschema

```
1
{
2
  "app_metadata": {
3
    "property1": null,
4
    "property2": null
5
  },
6
  "aud": "lorem",
7
  "banned_until": "2021-12-31T23:34:00Z",
8
  "confirmation_sent_at": "2021-12-31T23:34:00Z",
9
  "confirmed_at": "2021-12-31T23:34:00Z",
10
  "created_at": "2021-12-31T23:34:00Z",
11
  "email": "lorem",
12
  "email_change_sent_at": "2021-12-31T23:34:00Z",
13
  "email_confirmed_at": "2021-12-31T23:34:00Z",
14
  "id": "fbdf5a53-161e-4460-98ad-0e39408d8689",
15
  "identities": [\
16\
    {\
17\
      "created_at": "2021-12-31T23:34:00Z",\
18\
      "id": "lorem",\
19\
      "identity_data": {\
20\
        "property1": null,\
21\
        "property2": null\
22\
      },\
23\
      "last_sign_in_at": "2021-12-31T23:34:00Z",\
24\
      "provider": "lorem",\
25\
      "updated_at": "2021-12-31T23:34:00Z",\
26\
      "user_id": "fbdf5a53-161e-4460-98ad-0e39408d8689"\
27\
    }\
28\
  ],
29
  "invited_at": "2021-12-31T23:34:00Z",
30
  "last_sign_in_at": "2021-12-31T23:34:00Z",
31
  "new_email": "lorem",
32
  "new_phone": "lorem",
33
  "phone": "lorem",
34
  "phone_change_sent_at": "2021-12-31T23:34:00Z",
35
  "phone_confirmed_at": "2021-12-31T23:34:00Z",
36
  "reauthentication_sent_at": "2021-12-31T23:34:00Z",
37
  "recovery_sent_at": "2021-12-31T23:34:00Z",
38
  "role": "lorem",
39
  "updated_at": "2021-12-31T23:34:00Z",
40
  "user_metadata": {
41
    "property1": null,
42
    "property2": null
43
  }
44
}
```

* * *

## Update a user.

put`/admin/user/{user_id}`

### Path parameters

- user\_id

Required





The user's id


### Response codes

- 200
- 401

### Response (200)

exampleschema

```
1
{
2
  "app_metadata": {
3
    "property1": null,
4
    "property2": null
5
  },
6
  "aud": "lorem",
7
  "banned_until": "2021-12-31T23:34:00Z",
8
  "confirmation_sent_at": "2021-12-31T23:34:00Z",
9
  "confirmed_at": "2021-12-31T23:34:00Z",
10
  "created_at": "2021-12-31T23:34:00Z",
11
  "email": "lorem",
12
  "email_change_sent_at": "2021-12-31T23:34:00Z",
13
  "email_confirmed_at": "2021-12-31T23:34:00Z",
14
  "id": "fbdf5a53-161e-4460-98ad-0e39408d8689",
15
  "identities": [\
16\
    {\
17\
      "created_at": "2021-12-31T23:34:00Z",\
18\
      "id": "lorem",\
19\
      "identity_data": {\
20\
        "property1": null,\
21\
        "property2": null\
22\
      },\
23\
      "last_sign_in_at": "2021-12-31T23:34:00Z",\
24\
      "provider": "lorem",\
25\
      "updated_at": "2021-12-31T23:34:00Z",\
26\
      "user_id": "fbdf5a53-161e-4460-98ad-0e39408d8689"\
27\
    }\
28\
  ],
29
  "invited_at": "2021-12-31T23:34:00Z",
30
  "last_sign_in_at": "2021-12-31T23:34:00Z",
31
  "new_email": "lorem",
32
  "new_phone": "lorem",
33
  "phone": "lorem",
34
  "phone_change_sent_at": "2021-12-31T23:34:00Z",
35
  "phone_confirmed_at": "2021-12-31T23:34:00Z",
36
  "reauthentication_sent_at": "2021-12-31T23:34:00Z",
37
  "recovery_sent_at": "2021-12-31T23:34:00Z",
38
  "role": "lorem",
39
  "updated_at": "2021-12-31T23:34:00Z",
40
  "user_metadata": {
41
    "property1": null,
42
    "property2": null
43
  }
44
}
```

* * *

## Deletes a user.

delete`/admin/user/{user_id}`

### Path parameters

- user\_id

Required





The user's id


### Response codes

- 200
- 401

### Response (200)

schema

```
1
{}
```

* * *

## List all users.

get`/admin/users`

### Response codes

- 200
- 401

### Response (200)

exampleschema

```
1
{
2
  "aud": "lorem",
3
  "users": [\
4\
    {\
5\
      "app_metadata": {\
6\
        "property1": null,\
7\
        "property2": null\
8\
      },\
9\
      "aud": "lorem",\
10\
      "banned_until": "2021-12-31T23:34:00Z",\
11\
      "confirmation_sent_at": "2021-12-31T23:34:00Z",\
12\
      "confirmed_at": "2021-12-31T23:34:00Z",\
13\
      "created_at": "2021-12-31T23:34:00Z",\
14\
      "email": "lorem",\
15\
      "email_change_sent_at": "2021-12-31T23:34:00Z",\
16\
      "email_confirmed_at": "2021-12-31T23:34:00Z",\
17\
      "id": "fbdf5a53-161e-4460-98ad-0e39408d8689",\
18\
      "identities": [\
19\
        {\
20\
          "created_at": "2021-12-31T23:34:00Z",\
21\
          "id": "lorem",\
22\
          "identity_data": {\
23\
            "property1": null,\
24\
            "property2": null\
25\
          },\
26\
          "last_sign_in_at": "2021-12-31T23:34:00Z",\
27\
          "provider": "lorem",\
28\
          "updated_at": "2021-12-31T23:34:00Z",\
29\
          "user_id": "fbdf5a53-161e-4460-98ad-0e39408d8689"\
30\
        }\
31\
      ],\
32\
      "invited_at": "2021-12-31T23:34:00Z",\
33\
      "last_sign_in_at": "2021-12-31T23:34:00Z",\
34\
      "new_email": "lorem",\
35\
      "new_phone": "lorem",\
36\
      "phone": "lorem",\
37\
      "phone_change_sent_at": "2021-12-31T23:34:00Z",\
38\
      "phone_confirmed_at": "2021-12-31T23:34:00Z",\
39\
      "reauthentication_sent_at": "2021-12-31T23:34:00Z",\
40\
      "recovery_sent_at": "2021-12-31T23:34:00Z",\
41\
      "role": "lorem",\
42\
      "updated_at": "2021-12-31T23:34:00Z",\
43\
      "user_metadata": {\
44\
        "property1": null,\
45\
        "property2": null\
46\
      }\
47\
    }\
48\
  ]
49
}
```

* * *

## Returns the created user.

post`/admin/users`

### Body

application/json

- app\_metadata

Optional

object

Object schema

- aud

Optional

string

- ban\_duration

Optional

string

- email

Optional

string

- email\_confirm

Optional

boolean

- password

Optional

string

- phone

Optional

string

- phone\_confirm

Optional

boolean

- role

Optional

string

- user\_metadata

Optional

object

Object schema


### Response codes

- 200
- 401

### Response (200)

exampleschema

```
1
{
2
  "app_metadata": {
3
    "property1": null,
4
    "property2": null
5
  },
6
  "aud": "lorem",
7
  "banned_until": "2021-12-31T23:34:00Z",
8
  "confirmation_sent_at": "2021-12-31T23:34:00Z",
9
  "confirmed_at": "2021-12-31T23:34:00Z",
10
  "created_at": "2021-12-31T23:34:00Z",
11
  "email": "lorem",
12
  "email_change_sent_at": "2021-12-31T23:34:00Z",
13
  "email_confirmed_at": "2021-12-31T23:34:00Z",
14
  "id": "fbdf5a53-161e-4460-98ad-0e39408d8689",
15
  "identities": [\
16\
    {\
17\
      "created_at": "2021-12-31T23:34:00Z",\
18\
      "id": "lorem",\
19\
      "identity_data": {\
20\
        "property1": null,\
21\
        "property2": null\
22\
      },\
23\
      "last_sign_in_at": "2021-12-31T23:34:00Z",\
24\
      "provider": "lorem",\
25\
      "updated_at": "2021-12-31T23:34:00Z",\
26\
      "user_id": "fbdf5a53-161e-4460-98ad-0e39408d8689"\
27\
    }\
28\
  ],
29
  "invited_at": "2021-12-31T23:34:00Z",
30
  "last_sign_in_at": "2021-12-31T23:34:00Z",
31
  "new_email": "lorem",
32
  "new_phone": "lorem",
33
  "phone": "lorem",
34
  "phone_change_sent_at": "2021-12-31T23:34:00Z",
35
  "phone_confirmed_at": "2021-12-31T23:34:00Z",
36
  "reauthentication_sent_at": "2021-12-31T23:34:00Z",
37
  "recovery_sent_at": "2021-12-31T23:34:00Z",
38
  "role": "lorem",
39
  "updated_at": "2021-12-31T23:34:00Z",
40
  "user_metadata": {
41
    "property1": null,
42
    "property2": null
43
  }
44
}
```

* * *

## Receives the redirect from an external provider during the OAuth authentication process. Starts the process of creating an access and refresh token.

get`/callback`

### Response codes

- 302

* * *

## The healthcheck endpoint for gotrue. Returns the current gotrue version.

get`/health`

### Response codes

- 200

### Response (200)

exampleschema

```
1
{
2
  "description": "lorem",
3
  "name": "lorem",
4
  "version": "lorem"
5
}
```

* * *

## Sends an invite link to the user.

post`/invite`

### Body

application/json

- data

Optional

object

Object schema

- email

Optional

string


### Response codes

- 200

### Response (200)

schema

```
1
{}
```

* * *

## Logs out the user.

post`/logout`

### Response codes

- 204

### Response (204)

schema

```
1
{}
```

* * *

## Passwordless sign-in method for email or phone.

post`/otp`

### Body

application/json

- create\_user

Optional

boolean

- data

Optional

object

Object schema

- email

Optional

string

- phone

Optional

string


### Response codes

- 200

### Response (200)

schema

```
1
{}
```

* * *

## Sends a password recovery email link to the user's email.

post`/recover`

### Body

application/json

- email

Optional

string


### Response codes

- 200

### Response (200)

schema

```
1
{}
```

* * *

## Returns the configuration settings for the gotrue server.

get`/settings`

### Response codes

- 200

### Response (200)

exampleschema

```
1
{
2
  "disable_signup": true,
3
  "external": {
4
    "apple": true,
5
    "azure": true,
6
    "bitbucket": true,
7
    "discord": true,
8
    "email": true,
9
    "facebook": true,
10
    "github": true,
11
    "gitlab": true,
12
    "google": true,
13
    "keycloak": true,
14
    "linkedin": true,
15
    "notion": true,
16
    "phone": true,
17
    "saml": true,
18
    "slack": true,
19
    "spotify": true,
20
    "twitch": true,
21
    "twitter": true,
22
    "workos": true,
23
    "zoom": true
24
  },
25
  "mailer_autoconfirm": true,
26
  "phone_autoconfirm": true,
27
  "sms_provider": "lorem"
28
}
```

* * *

## Password-based signup with either email or phone.

post`/signup`

### Body

application/json

- data

Optional

object

Object schema

- email

Optional

string

- password

Optional

string

- phone

Optional

string


### Response codes

- 200

### Response (200)

exampleschema

```
1
{
2
  "app_metadata": {
3
    "property1": null,
4
    "property2": null
5
  },
6
  "aud": "lorem",
7
  "banned_until": "2021-12-31T23:34:00Z",
8
  "confirmation_sent_at": "2021-12-31T23:34:00Z",
9
  "confirmed_at": "2021-12-31T23:34:00Z",
10
  "created_at": "2021-12-31T23:34:00Z",
11
  "email": "lorem",
12
  "email_change_sent_at": "2021-12-31T23:34:00Z",
13
  "email_confirmed_at": "2021-12-31T23:34:00Z",
14
  "id": "fbdf5a53-161e-4460-98ad-0e39408d8689",
15
  "identities": [\
16\
    {\
17\
      "created_at": "2021-12-31T23:34:00Z",\
18\
      "id": "lorem",\
19\
      "identity_data": {\
20\
        "property1": null,\
21\
        "property2": null\
22\
      },\
23\
      "last_sign_in_at": "2021-12-31T23:34:00Z",\
24\
      "provider": "lorem",\
25\
      "updated_at": "2021-12-31T23:34:00Z",\
26\
      "user_id": "fbdf5a53-161e-4460-98ad-0e39408d8689"\
27\
    }\
28\
  ],
29
  "invited_at": "2021-12-31T23:34:00Z",
30
  "last_sign_in_at": "2021-12-31T23:34:00Z",
31
  "new_email": "lorem",
32
  "new_phone": "lorem",
33
  "phone": "lorem",
34
  "phone_change_sent_at": "2021-12-31T23:34:00Z",
35
  "phone_confirmed_at": "2021-12-31T23:34:00Z",
36
  "reauthentication_sent_at": "2021-12-31T23:34:00Z",
37
  "recovery_sent_at": "2021-12-31T23:34:00Z",
38
  "role": "lorem",
39
  "updated_at": "2021-12-31T23:34:00Z",
40
  "user_metadata": {
41
    "property1": null,
42
    "property2": null
43
  }
44
}
```

* * *

## Signs in a user with a password.

post`/token?grant_type=password`

### Body

application/json

- email

Optional

string

- password

Optional

string

- phone

Optional

string


### Response codes

- 200

### Response (200)

exampleschema

```
1
{
2
  "access_token": "lorem",
3
  "expires_in": 42,
4
  "refresh_token": "lorem",
5
  "token_type": "lorem",
6
  "user": {
7
    "app_metadata": {
8
      "property1": null,
9
      "property2": null
10
    },
11
    "aud": "lorem",
12
    "banned_until": "2021-12-31T23:34:00Z",
13
    "confirmation_sent_at": "2021-12-31T23:34:00Z",
14
    "confirmed_at": "2021-12-31T23:34:00Z",
15
    "created_at": "2021-12-31T23:34:00Z",
16
    "email": "lorem",
17
    "email_change_sent_at": "2021-12-31T23:34:00Z",
18
    "email_confirmed_at": "2021-12-31T23:34:00Z",
19
    "id": "fbdf5a53-161e-4460-98ad-0e39408d8689",
20
    "identities": [\
21\
      {\
22\
        "created_at": "2021-12-31T23:34:00Z",\
23\
        "id": "lorem",\
24\
        "identity_data": {\
25\
          "property1": null,\
26\
          "property2": null\
27\
        },\
28\
        "last_sign_in_at": "2021-12-31T23:34:00Z",\
29\
        "provider": "lorem",\
30\
        "updated_at": "2021-12-31T23:34:00Z",\
31\
        "user_id": "fbdf5a53-161e-4460-98ad-0e39408d8689"\
32\
      }\
33\
    ],
34
    "invited_at": "2021-12-31T23:34:00Z",
35
    "last_sign_in_at": "2021-12-31T23:34:00Z",
36
    "new_email": "lorem",
37
    "new_phone": "lorem",
38
    "phone": "lorem",
39
    "phone_change_sent_at": "2021-12-31T23:34:00Z",
40
    "phone_confirmed_at": "2021-12-31T23:34:00Z",
41
    "reauthentication_sent_at": "2021-12-31T23:34:00Z",
42
    "recovery_sent_at": "2021-12-31T23:34:00Z",
43
    "role": "lorem",
44
    "updated_at": "2021-12-31T23:34:00Z",
45
    "user_metadata": {
46
      "property1": null,
47
      "property2": null
48
    }
49
  }
50
}
```

* * *

## Refreshes a user's refresh token.

post`/token?grant_type=refresh_token`

### Body

application/json

- refresh\_token

Optional

string


### Response codes

- 200

### Response (200)

exampleschema

```
1
{
2
  "access_token": "lorem",
3
  "expires_in": 42,
4
  "refresh_token": "lorem",
5
  "token_type": "lorem",
6
  "user": {
7
    "app_metadata": {
8
      "property1": null,
9
      "property2": null
10
    },
11
    "aud": "lorem",
12
    "banned_until": "2021-12-31T23:34:00Z",
13
    "confirmation_sent_at": "2021-12-31T23:34:00Z",
14
    "confirmed_at": "2021-12-31T23:34:00Z",
15
    "created_at": "2021-12-31T23:34:00Z",
16
    "email": "lorem",
17
    "email_change_sent_at": "2021-12-31T23:34:00Z",
18
    "email_confirmed_at": "2021-12-31T23:34:00Z",
19
    "id": "fbdf5a53-161e-4460-98ad-0e39408d8689",
20
    "identities": [\
21\
      {\
22\
        "created_at": "2021-12-31T23:34:00Z",\
23\
        "id": "lorem",\
24\
        "identity_data": {\
25\
          "property1": null,\
26\
          "property2": null\
27\
        },\
28\
        "last_sign_in_at": "2021-12-31T23:34:00Z",\
29\
        "provider": "lorem",\
30\
        "updated_at": "2021-12-31T23:34:00Z",\
31\
        "user_id": "fbdf5a53-161e-4460-98ad-0e39408d8689"\
32\
      }\
33\
    ],
34
    "invited_at": "2021-12-31T23:34:00Z",
35
    "last_sign_in_at": "2021-12-31T23:34:00Z",
36
    "new_email": "lorem",
37
    "new_phone": "lorem",
38
    "phone": "lorem",
39
    "phone_change_sent_at": "2021-12-31T23:34:00Z",
40
    "phone_confirmed_at": "2021-12-31T23:34:00Z",
41
    "reauthentication_sent_at": "2021-12-31T23:34:00Z",
42
    "recovery_sent_at": "2021-12-31T23:34:00Z",
43
    "role": "lorem",
44
    "updated_at": "2021-12-31T23:34:00Z",
45
    "user_metadata": {
46
      "property1": null,
47
      "property2": null
48
    }
49
  }
50
}
```

* * *

## Get information for the logged-in user.

get`/user`

### Response codes

- 200
- 401

### Response (200)

exampleschema

```
1
{
2
  "app_metadata": {
3
    "property1": null,
4
    "property2": null
5
  },
6
  "aud": "lorem",
7
  "banned_until": "2021-12-31T23:34:00Z",
8
  "confirmation_sent_at": "2021-12-31T23:34:00Z",
9
  "confirmed_at": "2021-12-31T23:34:00Z",
10
  "created_at": "2021-12-31T23:34:00Z",
11
  "email": "lorem",
12
  "email_change_sent_at": "2021-12-31T23:34:00Z",
13
  "email_confirmed_at": "2021-12-31T23:34:00Z",
14
  "id": "fbdf5a53-161e-4460-98ad-0e39408d8689",
15
  "identities": [\
16\
    {\
17\
      "created_at": "2021-12-31T23:34:00Z",\
18\
      "id": "lorem",\
19\
      "identity_data": {\
20\
        "property1": null,\
21\
        "property2": null\
22\
      },\
23\
      "last_sign_in_at": "2021-12-31T23:34:00Z",\
24\
      "provider": "lorem",\
25\
      "updated_at": "2021-12-31T23:34:00Z",\
26\
      "user_id": "fbdf5a53-161e-4460-98ad-0e39408d8689"\
27\
    }\
28\
  ],
29
  "invited_at": "2021-12-31T23:34:00Z",
30
  "last_sign_in_at": "2021-12-31T23:34:00Z",
31
  "new_email": "lorem",
32
  "new_phone": "lorem",
33
  "phone": "lorem",
34
  "phone_change_sent_at": "2021-12-31T23:34:00Z",
35
  "phone_confirmed_at": "2021-12-31T23:34:00Z",
36
  "reauthentication_sent_at": "2021-12-31T23:34:00Z",
37
  "recovery_sent_at": "2021-12-31T23:34:00Z",
38
  "role": "lorem",
39
  "updated_at": "2021-12-31T23:34:00Z",
40
  "user_metadata": {
41
    "property1": null,
42
    "property2": null
43
  }
44
}
```

* * *

## Returns the updated user.

put`/user`

### Body

application/json

- app\_metadata

Optional

object

Object schema

- data

Optional

object

Object schema

- email

Optional

string

- nonce

Optional

string

- password

Optional

string

- phone

Optional

string


### Response codes

- 200
- 401

### Response (200)

exampleschema

```
1
{
2
  "app_metadata": {
3
    "property1": null,
4
    "property2": null
5
  },
6
  "aud": "lorem",
7
  "banned_until": "2021-12-31T23:34:00Z",
8
  "confirmation_sent_at": "2021-12-31T23:34:00Z",
9
  "confirmed_at": "2021-12-31T23:34:00Z",
10
  "created_at": "2021-12-31T23:34:00Z",
11
  "email": "lorem",
12
  "email_change_sent_at": "2021-12-31T23:34:00Z",
13
  "email_confirmed_at": "2021-12-31T23:34:00Z",
14
  "id": "fbdf5a53-161e-4460-98ad-0e39408d8689",
15
  "identities": [\
16\
    {\
17\
      "created_at": "2021-12-31T23:34:00Z",\
18\
      "id": "lorem",\
19\
      "identity_data": {\
20\
        "property1": null,\
21\
        "property2": null\
22\
      },\
23\
      "last_sign_in_at": "2021-12-31T23:34:00Z",\
24\
      "provider": "lorem",\
25\
      "updated_at": "2021-12-31T23:34:00Z",\
26\
      "user_id": "fbdf5a53-161e-4460-98ad-0e39408d8689"\
27\
    }\
28\
  ],
29
  "invited_at": "2021-12-31T23:34:00Z",
30
  "last_sign_in_at": "2021-12-31T23:34:00Z",
31
  "new_email": "lorem",
32
  "new_phone": "lorem",
33
  "phone": "lorem",
34
  "phone_change_sent_at": "2021-12-31T23:34:00Z",
35
  "phone_confirmed_at": "2021-12-31T23:34:00Z",
36
  "reauthentication_sent_at": "2021-12-31T23:34:00Z",
37
  "recovery_sent_at": "2021-12-31T23:34:00Z",
38
  "role": "lorem",
39
  "updated_at": "2021-12-31T23:34:00Z",
40
  "user_metadata": {
41
    "property1": null,
42
    "property2": null
43
  }
44
}
```

* * *

## Verifies a sign up.

post`/verify`

### Body

application/json

- email

Optional

string

- phone

Optional

string

- redirect\_to

Optional

string

- token

Optional

string

- type

Optional

string


- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)