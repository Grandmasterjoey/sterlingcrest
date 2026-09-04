# SEO Factory content

The SEO Factory generic publisher commits MDX here:

`content/seo/{slug}.mdx`

Frontmatter `template` chooses the layout:

| template | URL |
| --- | --- |
| `blog-page`, `comparison-page`, `faq-cluster` | `/resources/{slug}` |
| `insurance-type-page` | `/insurance/{slug}` |
| `location-page` | `/locations/{slug}` |

Do not put secrets in these files. Stub pages below show the expected shape.
