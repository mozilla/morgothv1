from django.contrib.auth.models import User


class LDAPBackend(object):
    def authenticate(self, ldap_username=None):
        if ldap_username:
            try:
                user = User.objects.get(username=ldap_username)
            except User.DoesNotExist:
                user = User.objects.create_user(ldap_username)
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
