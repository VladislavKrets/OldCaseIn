ALLOWED_HOSTS = '*'
GOOGLE_DRIVE_STORAGE_JSON_KEY_FILE = 'credentials.json'
GOOGLE_DRIVE_STORAGE_MEDIA_ROOT = 'case-in'
DOWNLOAD_NLTK_LIBRARIES = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'casein',
        'USER': 'casein',
        'PASSWORD': 'password',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": ['redis://localhost:6379/4']
        }
    },
}