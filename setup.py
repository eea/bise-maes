# -*- coding: utf-8 -*-

from setuptools import setup


setup(
    name='bise-maes',
    version='1.0',
    description="BISE MAES presentation",
    long_description="BISE MAES presentation",
    # Get more from https://pypi.python.org/pypi?%3Aaction=list_classifiers
    classifiers=[
        "Environment :: Web Environment",
        "Framework :: Plone",
        "Framework :: Plone :: 4.3",
        "Programming Language :: Python",
        "Programming Language :: Python :: 2.7",
        "Operating System :: OS Independent",
        "License :: OSI Approved :: GNU General Public License v2 (GPLv2)",
    ],
    keywords='Python Plone Vue',
    author='Mihai Măcăneață',
    author_email='mihai.macaneata@eaudeweb.ro',
    url='https://github.com/eea/bise-maes',
    license='GPL version 2',
    packages=['bise-maes'],
    package_dir={'bise-maes': 'project'},
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'setuptools',
    ],
    entry_points="""
    [z3c.autoinclude.plugin]
    target = plone
    """,
)
