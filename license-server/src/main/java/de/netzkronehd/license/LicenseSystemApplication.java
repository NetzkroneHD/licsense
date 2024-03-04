package de.netzkronehd.license;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.Map;

@SpringBootApplication(scanBasePackages = "de.netzkronehd.license")
@Slf4j
public class LicenseSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(LicenseSystemApplication.class, args);
	}

	@EventListener
	public void handleContextRefresh(ContextRefreshedEvent event) {
		final ApplicationContext applicationContext = event.getApplicationContext();
		final RequestMappingHandlerMapping requestMappingHandlerMapping = applicationContext.getBean("requestMappingHandlerMapping", RequestMappingHandlerMapping.class);
		final Map<RequestMappingInfo, HandlerMethod> map = requestMappingHandlerMapping.getHandlerMethods();

		map.forEach((key, value) -> log.info("{} {}", key, value));
	}

}
