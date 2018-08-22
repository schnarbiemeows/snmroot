package utility;

import java.util.Random;

public class UtilityClass {
	private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	public static String randomAlphaNumeric(int count) {
		StringBuilder builder = new StringBuilder();
		while (count-- != 0) {
			int character = (int) (Math.random() * ALPHA_NUMERIC_STRING.length());
			builder.append(ALPHA_NUMERIC_STRING.charAt(character));
		}
		return builder.toString();
	}

	public static void timeDelay(int milliseconds) {
		try {
			log("sleeping for " + milliseconds + " milliseconds");
			Thread.sleep(milliseconds);
		} catch (InterruptedException ex) {
			Thread.currentThread().interrupt();
			log("sleep interrupted!");
		}
	}

	public static int randomInteger(int min, int max) {
		Random rand = new Random();
		int result = rand.nextInt((max - min) + 1) + min;
		return result;
	}

	public static String getRandomStockName() {
		String[] stocks = new String[10];
		stocks[0] = "ADI";
		stocks[1] = "AMAT";
		stocks[2] = "KNOW";
		stocks[3] = "RYT";
		stocks[4] = "RYF";
		stocks[5] = "SOXX";
		stocks[6] = "SCHB";
		stocks[7] = "SCHD";
		stocks[8] = "SLYV";
		stocks[9] = "XAR";
		return stocks[randomInteger(0, 9)];
	}

	public static String getRandomClientCode() {
		String[] stocks = new String[10];
		stocks[0] = "ABC123";
		stocks[1] = "DEF456";
		stocks[2] = "GHI789";
		stocks[3] = "JKL123";
		stocks[4] = "MNO456";
		stocks[5] = "PQR789";
		stocks[6] = "STU123";
		stocks[7] = "VWX456";
		stocks[8] = "YZA789";
		stocks[9] = "BCD123";
		return stocks[randomInteger(0, 9)];
	}

	public static String getRandomAction() {
		String[] stocks = new String[10];
		stocks[0] = "BUY_MARKET_ORDER";
		stocks[1] = "BUY_LIMIT";
		stocks[2] = "BUY_STOP";
		stocks[3] = "BUY_STOP_LIMIT";
		stocks[4] = "SELL_MARKET_ORDER";
		stocks[5] = "SELL_LIMIT";
		stocks[6] = "SELL_STOP";
		stocks[7] = "SELL_STOP_LIMIT";
		stocks[8] = "PRICE";
		stocks[9] = "QUERY";
		return stocks[randomInteger(0, 9)];
	}

	public static int getPriceLength() {
		return randomInteger(3, 6);
	}

	public static String getRandomPrice() {
		String price = "";
		int priceLength = getPriceLength();
		for (int i = 0; i < priceLength; i++) {
			if (i == 0) {
				price += randomInteger(1, 9);
			} else if (i == priceLength - 2) {
				price += "." + randomInteger(0, 9);
			} else {
				price += randomInteger(0, 9);
			}
		}
		// log("price = " + price);
		return price;
	}

	public static String generateLoggingStatement(String source) {
		String loggingStatement = source + " ";
		String action = getRandomAction() + " ";
		String stock = getRandomStockName() + " ";
		String client = getRandomClientCode() + " ";
		loggingStatement += client + action + stock;
		if (action.contains("BUY") || action.contains("SELL")) {
			loggingStatement += getRandomPrice();
		}
		return loggingStatement;
	}

	public static String generateLoggingStatement(String source, int counter) {
		String loggingStatement = source + " " + counter + " ";
		String action = getRandomAction() + " ";
		String stock = getRandomStockName() + " ";
		String client = getRandomClientCode() + " ";
		loggingStatement += client + action + stock;
		if (action.contains("BUY") || action.contains("SELL")) {
			loggingStatement += getRandomPrice();
		}
		return loggingStatement;
	}

	private static void log(String message) {
		LogUtil log = LogUtil.getMasterLogger();
		log.utilityLoggerDEBUG(message);
	}

}
