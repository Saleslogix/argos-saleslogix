<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" indent="yes" encoding="UTF-8"/>

  <xsl:template match="/localization">
  <localization>
  <xsl:apply-templates />
  </localization>
  </xsl:template>

  <xsl:template match="/localization/properties/property">
  <data>
    <xsl:attribute name="class"><xsl:value-of select="class" /></xsl:attribute>
    <xsl:attribute name="property"><xsl:value-of select="name" /></xsl:attribute>
    <xsl:attribute name="type"><xsl:value-of select="type" /></xsl:attribute>
    <description />
    <value><xsl:value-of select="value" /></value>
  </data>
  </xsl:template>
</xsl:stylesheet>