import factory

from factory import fuzzy

from morgoth.addons.models import Addon, AddonGroup
from morgoth.base.tests import FuzzyUnicode


class AddonFactory(factory.DjangoModelFactory):
    name = FuzzyUnicode()
    version = fuzzy.FuzzyDecimal(0.1, 99.9, 1)
    ftp_url = factory.Faker('url')

    class Meta:
        model = Addon


class AddonGroupFactory(factory.DjangoModelFactory):
    channel_name = FuzzyUnicode()
    browser_version = fuzzy.FuzzyDecimal(0.1, 99.9, 1)

    class Meta:
        model = AddonGroup

    @factory.post_generation
    def addons(self, create, extracted, **kwargs):
        if not create:
            # Simple build, do nothing.
            return

        if extracted:
            # A list of groups were passed in, use them
            for addon in extracted:
                self.addons.add(addon)
