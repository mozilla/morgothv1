from django.contrib.auth.models import User

import factory
import random

from factory import fuzzy

from morgoth.addons.models import VersionNumber


class Whatever(object):
    def __init__(self, test=lambda x: True):
        self.test = test

    @classmethod
    def endswith(cls, suffix):
        return cls(lambda s: s.endswith(suffix))

    def __eq__(self, other):
        return self.test(other)


class FuzzyUnicode(fuzzy.FuzzyText):
    """A FuzzyText factory that contains at least one non-ASCII character."""

    def __init__(self, prefix=u'', **kwargs):
        prefix = '%sđ' % prefix
        super(FuzzyUnicode, self).__init__(prefix=prefix, **kwargs)


class FuzzyVersionNumber(factory.fuzzy.BaseFuzzyAttribute):
    """Random version number."""

    def fuzz(self):
        return str(VersionNumber(major=random.randint(1, 99), minor=random.randint(0, 99),
                                 build=random.randint(0, 99)))


class UserFactory(factory.DjangoModelFactory):
    username = FuzzyUnicode()
    email = factory.Sequence(lambda n: 'test%s@example.com' % n)

    class Meta:
        model = User
