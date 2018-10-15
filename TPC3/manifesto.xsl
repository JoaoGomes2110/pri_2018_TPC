<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <meta charset="UTF-8"/>
            </head>
            <body>  
                <h1 align = "left"> Manifesto </h1>
                <hr/>                
                <xsl:apply-templates/> 
            </body>
        </html>
        
    </xsl:template>
    
    <xsl:template match="meta">
       <table border="0">
           <xsl:apply-templates/>
       </table>
       <hr/> 
    </xsl:template>
    
    <xsl:template match="equipe">
        <h2>Equipa: </h2>
        <ul style="list-style-type:square">
            <xsl:apply-templates/>
        </ul>
        <hr/>
    </xsl:template>
    
    <xsl:template match="resumo">
        <h2> Resumo: </h2>
        <p>
            <xsl:apply-templates/>                
        </p>
        <hr/>
    </xsl:template>
    
    <xsl:template match="resultados">
        <h2>Resultados: </h2>
        <ol type="1">
            <xsl:apply-templates/>
        </ol>
    </xsl:template>
    
    <xsl:template match = "//meta/id">
        <tr>
            <td> 
                <b>Identificador: </b> 
                <xsl:value-of select="."/>
            </td>
        </tr>
    </xsl:template>
    
    <xsl:template match = "título">
        <tr>
            <td>
                <b>Título: </b>
                <xsl:value-of select="."/>
            </td>
        </tr>
    </xsl:template>
    
    <xsl:template match = "subtítulo">
        <tr>
            <td>
                <b>Subtítulo: </b>
                <xsl:value-of select="."/>
            </td>
        </tr>
    </xsl:template>
    
    <xsl:template match = "dinício">
        <tr>
            <td>
                <b>Data de Início: </b>
                <xsl:value-of select="."/>
            </td>
        </tr>
    </xsl:template>
    
    <xsl:template match = "dfim">
        <tr>
            <td>
                <b>Data de Fim: </b>
                <xsl:value-of select="."/>
            </td>
        </tr>
    </xsl:template>
    
    <xsl:template match="supervisor">
        <tr>
            <td>
                <b>Website: </b>
                <a href="{website}"> 
                    <xsl:value-of select="nome"/>
                </a>
                <br/>
                <b>Email: </b>
                <a href="mailto:{email}"> 
                    Enviar Correio
                </a>
            </td>
        </tr>
    </xsl:template>
    
    <xsl:template match="//elemento/id">
        <li>
            <b>Identificador: </b>
            <xsl:value-of select="."/>
        </li>
    </xsl:template>
    
    <xsl:template match="nome">
        <li>
            <b>Nome: </b>
            <xsl:value-of select="."/>
        </li>
    </xsl:template>
    
    <xsl:template match="//elemento/email">
        <li>
            <b>Email: </b>
            <a href="mailto:{//elemento/email}">
                Enviar Correio
            </a>    
        </li>
    </xsl:template>
    
    <xsl:template match="//elemento/website">
        <li>
            <b>Website: </b>
            <a href="{//elemento/website}"> 
                <xsl:value-of select="//elemento/nome"/>
            </a> 
        </li>
    </xsl:template>

    <xsl:template match="foto">
        <li>
            <a href="{//elemento/foto/@path}"> <b>Fotografia </b></a>
        </li>
    </xsl:template>
    
    <xsl:template match="para">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <xsl:template match="b">
        <b>
            <xsl:value-of select="."/>
        </b>
        
    </xsl:template>
    
    <xsl:template match="i">
        <i>
            <xsl:value-of select="."/>
        </i>
        
    </xsl:template>
    
    <xsl:template match="resultado">
        <li><a href="{@path}"> <xsl:value-of select="."/></a></li>
    </xsl:template>
    
</xsl:stylesheet>