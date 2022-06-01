package com.gottig.portfolio.jwtsecurity.jwtepf;

import com.gottig.portfolio.jwtsecurity.jwtmodel.JwtUserMain;
import io.jsonwebtoken.*;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;


/**
 * Clase que genera el token y valida que este bien formado y no este expirado
 */
@Component
public class JwtProvider {
    
     // Implementamos un logger para ver cual metodo da error en caso de falla
    private final static Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    //Valores que tenemos en el aplicattion.properties
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private int expiration;

    /**
     *setIssuedAt --> Asigna fecha de creción del token
     *setExpiration --> Asigna fehca de expiración
     * signWith --> Firma
     * @param authentication
     * @return 
     */
    public String generateToken(Authentication authentication){
        JwtUserMain userMain = (JwtUserMain) authentication.getPrincipal();
        return Jwts.builder().setSubject(userMain.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + expiration * 1000))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    //subject --> Nombre del usuario
    public String getUserNameFromToken(String token){
           return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
    }

    public Boolean validateToken(String token){
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        }catch (MalformedJwtException e){
            logger.error("Malformed token");
        }catch (UnsupportedJwtException e){
            logger.error("Token not supported");
        }catch (ExpiredJwtException e){
            logger.error("Expired token");
        }catch (IllegalArgumentException e){
            logger.error("Empty token");
        }catch (SignatureException e){
            logger.error("Failure with the signature");
        }
        return false;
    }
    
}
