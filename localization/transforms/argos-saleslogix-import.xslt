<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" indent="yes" encoding="UTF-8"/>

  <xsl:template match="/localization">
  <localization>
    <properties>
      <xsl:apply-templates />
    </properties>
  </localization>
  </xsl:template>

  <xsl:template match="data">
  <property>
    <class>
      <xsl:value-of select="@class" />
    </class>
    <name>
      <xsl:value-of select="@property" />
    </name>
    <type>
      <xsl:value-of select="@type" />
    </type>
    <value>
      <xsl:value-of select="value" />
    </value>
  </property>
  </xsl:template>
</xsl:stylesheet>