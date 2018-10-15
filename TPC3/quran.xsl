<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="quran/index.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <h1><xsl:value-of select="tstmt/coverpg/title"/></h1>
                    <h3><xsl:value-of select="tstmt/coverpg/title2"/></h3>
                    <hr/>
                    <table width="100%">
                        <tr>
                            <td width="20%">
                                <ul>
                                    <xsl:apply-templates select ="tstmt/suracoll/sura" mode="indice"/>
                                </ul>
                            </td>
                            <td width="80%" valign="top">
                                <h5><xsl:value-of select="tstmt/coverpg/subtitle"/></h5>
                                <hr/>
                                <h3><xsl:value-of select="tstmt/titlepg/title"/></h3>
                                <h4><xsl:value-of select="tstmt/titlepg/subtitle"/></h4>
                                <xsl:apply-templates select="/tstmt/preface" mode="conteudo"/>
                            </td>
                        </tr>
                    </table>
                    
                </body>
            </html>
        </xsl:result-document>
        <!-- Geração de páginas individuais -->
        <xsl:apply-templates/> 
    </xsl:template>
    
    <!-- Index.html -->
    <xsl:template match="preface" mode="conteudo">
        <b><i><xsl:value-of select="ptitle"/></i></b>
        <p><xsl:value-of select="p"/></p>
    </xsl:template>
    
    <xsl:template match="text()" mode="indice" priority="-1"/>
    
    <xsl:template match="sura" mode="indice">
        <li>
            <a href="sura{count(preceding-sibling::*) + 1}.html">
                <xsl:value-of select="bktlong"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- Páginas individuais -->
    
    <xsl:template match="sura">
        <xsl:result-document href="quran/sura{count(preceding-sibling::*)+1}.html">
            <htm>
                <head>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <h1><xsl:value-of select="bktlong"/></h1>
                    <h2><xsl:value-of select="bktshort"/></h2>
                    <hr/>
                    <ul>
                        <xsl:apply-templates/>
                    </ul>
                    <hr/>
                    <p>
                        [**<a href="index.html">Voltar ao Indice!</a>**]
                    </p>
                </body>
            </htm>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="bktlong"/>
    
    <xsl:template match="bktshort"/>
    
    <xsl:template match="epigraph">
        <b><xsl:value-of select="."/></b>
    </xsl:template>
    
    <xsl:template match="v">
        <li>
            <xsl:value-of select="."/>
        </li>
    </xsl:template>
    
</xsl:stylesheet>