package de.netzkronehd.license;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "de.netzkronehd")
public class LicenseSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(LicenseSystemApplication.class, args);
	}

}
