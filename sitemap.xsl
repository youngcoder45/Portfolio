<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Sitemap</title>
        <style>
          body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 24px; color: #111; }
          h1 { font-size: 20px; margin: 0 0 12px; }
          p { margin: 0 0 16px; color: #444; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 10px; vertical-align: top; }
          th { background: #f6f6f6; text-align: left; }
          .url { word-break: break-all; }
          .muted { color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>Sitemap</h1>
        <p class="muted">This view is for humans. Search engines read the underlying XML.</p>

        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Last Modified</th>
              <th>Changefreq</th>
              <th>Priority</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="s:urlset/s:url">
              <tr>
                <td class="url">
                  <a>
                    <xsl:attribute name="href"><xsl:value-of select="s:loc"/></xsl:attribute>
                    <xsl:value-of select="s:loc"/>
                  </a>
                </td>
                <td><xsl:value-of select="s:lastmod"/></td>
                <td><xsl:value-of select="s:changefreq"/></td>
                <td><xsl:value-of select="s:priority"/></td>
                <td class="url">
                  <xsl:choose>
                    <xsl:when test="s:image/image:loc">
                      <a>
                        <xsl:attribute name="href"><xsl:value-of select="s:image/image:loc"/></xsl:attribute>
                        <xsl:value-of select="s:image/image:loc"/>
                      </a>
                    </xsl:when>
                    <xsl:otherwise></xsl:otherwise>
                  </xsl:choose>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
