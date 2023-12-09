package de.netzkronehd.license.utils;

import java.util.Random;

public class Utils {

    private static final char[] characters = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".toCharArray();

    public static String getRandomString(int length) {
		final StringBuilder sb = new StringBuilder();
		final Random random = new Random();
		for (int i = 0; i < length; i++) {
			sb.append(characters[random.nextInt(characters.length)]);
		}
		return sb.toString();
	}

}
