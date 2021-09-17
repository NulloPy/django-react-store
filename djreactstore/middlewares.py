import jwt

from django.conf import settings

from django.utils.deprecation import MiddlewareMixin
from django.contrib.auth.middleware import AuthenticationMiddleware
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser

User = get_user_model()

class CsrfDisableCheckMiddleware(MiddlewareMixin):

    def process_request(self, request, *args, **kwargs):
        if not getattr(request, '_dont_enforce_csrf_checks', False):
            # Mechanism to turn off CSRF checks for test suite.
            # It comes after the creation of CSRF cookies, so that
            # everything else continues to work exactly the same
            # (e.g. cookies are sent, etc.), but before any
            # branches that call reject().
            setattr(request, '_dont_enforce_csrf_checks', True)


class JWTUserTokenAuthorizationMiddleware(MiddlewareMixin):

    def process_request(self, request):
        if request.path.find('admin') != -1:
            return super(AuthenticationMiddleware).process_request(request)
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if auth_header:
            try:
                token = auth_header.split(' ')[-1]
                data = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                request.user = User.objects.get(id=int(data['user_id']))
            except (jwt.exceptions.DecodeError, jwt.exceptions.ExpiredSignatureError):
                request.user = AnonymousUser()
        else:
            request.user = AnonymousUser()
