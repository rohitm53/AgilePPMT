package io.agileintelligence.ppmt.security;

import io.agileintelligence.ppmt.domain.User;
import io.agileintelligence.ppmt.services.CustomeUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

import static io.agileintelligence.ppmt.security.SecurityConstants.HEADER_STRING;
import static io.agileintelligence.ppmt.security.SecurityConstants.TOKEN_PREFIX;

public class JWTAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private CustomeUserDetailsService customeUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {

        try{
            String jwt = getJWTfromRequest(httpServletRequest);
            if(StringUtils.hasText(jwt) && jwtTokenProvider.validToken(jwt)){
                Long userId = jwtTokenProvider.getUserIdfromJWT(jwt);
                User userDetail = customeUserDetailsService.loadUserById(userId);

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetail,null, Collections.emptyList()
                );

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }catch (Exception ex){
            logger.error("Could not set user authentication in security context",ex);
        }

        filterChain.doFilter(httpServletRequest,httpServletResponse);
    }

    private String getJWTfromRequest(HttpServletRequest httpServletRequest){

        String bearerToken = httpServletRequest.getHeader(HEADER_STRING);

        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith(TOKEN_PREFIX)){
            return bearerToken.substring(7,bearerToken.length());
        }
        return null;
    }
}
