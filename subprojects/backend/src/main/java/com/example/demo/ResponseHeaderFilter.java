package com.example.demo;

import com.example.demo.common.ApplicationVersion;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@WebFilter("/*")
public class ResponseHeaderFilter implements Filter {

    private final ApplicationVersion applicationVersion;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        httpServletResponse.setHeader("app-version", applicationVersion.getVersion());
        chain.doFilter(request, response);
    }

}
