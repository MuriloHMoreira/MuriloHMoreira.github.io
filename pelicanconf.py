#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Murilo Henrique Moreira'
SITENAME = 'Intricacy of Simplicity'
SITEURL = 'http://MuriloHMoreira.github.io'

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

# Define some project paths that have special meanings in Pelican
PATH = 'content'
ARTICLE_PATHS = ['blogs',]
PAGE_PATHS = ['pages']
STATIC_PATHS = ['images', 'extra/main.css', 'extra/favicon.ico']

# Internationalization settings
TIMEZONE = 'Europe/Paris'
DEFAULT_LANG = 'en'


# Theme
THEME = "themes/pure-single"
COVER_IMG_URL = '/images/sidebar.jpg'
TAGLINE = "A little bit of Math turns everything fun"
SUMMARY_MAX_LENGTH = (20)
FAVICON = 'extra/FAVICON'
# Configure the site menu
# Fixed menu entries
MENUITEMS = (
    ('About', '/pages/about.html'),
    ('CV', '/pages/cv.html'),
    ('Subscribe Here!', '/pages/subscribe.html'),
)

# Dynamic menu entries§
DISPLAY_CATEGORIES_ON_MENU = False
DISPLAY_PAGES_ON_MENU = True



# Gather as much metadata as possible from the file system
USE_FOLDER_AS_CATEGORY = True
FILENAME_METADATA = '(?P<date>\d{4}-\d{2}-\d{2})_(?P<slug>.*)'
DEFAULT_DATE = 'fs'
# Set some defaults§
DEFAULT_CATEGORY = 'ramblings'
DEFAULT_DATE_FORMAT = '%a %d %B %Y'
DEFAULT_PAGINATION = 10


# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None
FEED_ALL_RSS = 'feeds/all.rss.xml'

# Social widget
SOCIAL = (('twitter', 'https://twitter.com/MuriloHMoreira'),
          ('github', 'https://github.com/MuriloHMoreira'),
          ('linkedin', 'https://www.linkedin.com/in/murilo-moreira-095534bb/'), 
          ('rss', 'https://murilohmoreira.github.io/feeds/all.rss.xml'),
          ('orcid', 'https://orcid.org/0000-0002-2591-4760')
          )


MARKUP = ('md', 'ipynb')


# pelicanfly workaround
EXTRA_PATH_METADATA = {
    'extra/main.css': {'path': 'theme/css/main.css'},
    'extra/favicon.ico': {'path': 'favicon.ico'},
}

PLUGIN_PATHS = ['./plugins']
PLUGINS = ['ipynb.markup', 'pelicanfly']
DISQUS_SITENAME = "i-of-s"

# Give the control on the css highlighter
IPYNB_IGNORE_CSS=True

