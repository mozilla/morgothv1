import factory

from tempfile import NamedTemporaryFile
from unittest.mock import patch

from factory import fuzzy

from morgoth.addons.models import Addon, AddonGroup
from morgoth.base.tests import FuzzyUnicode


class AddonFactory(factory.DjangoModelFactory):
    name = FuzzyUnicode()
    version = fuzzy.FuzzyDecimal(0.1, 99.9, 1)
    ftp_url = factory.Faker('url')

    class Meta:
        model = Addon

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        obj = model_class(*args, **kwargs)

        def mock_urlretrieve(*args, **kwargs):
            f = NamedTemporaryFile(delete=False)
            f.write(b'Testfile\n')
            tmp_file = f.name
            f.close()
            return tmp_file, None

        with patch('urllib.request.urlretrieve', mock_urlretrieve):
            obj.save()

        return obj


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
