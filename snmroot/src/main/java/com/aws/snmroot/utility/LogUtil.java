package com.aws.snmroot.utility;

import org.apache.log4j.Logger;

public class LogUtil {
	/*
	 * this will be a global object that contains a singleton instance of any
	 * loggers are needed. All these loggers will be in the log4j.properties file
	 */
	private Logger snmrootLogger;
	private Logger utilityLogger;
	private static LogUtil logUtil;

	private LogUtil() {
		this.snmrootLogger = Logger.getLogger("snmrootLogger");
		this.utilityLogger = Logger.getLogger("utilityLogger");
	}

	public static synchronized LogUtil getMasterLogger() {
		if (null == logUtil) {
			logUtil = new LogUtil();
		}
		return LogUtil.logUtil;
	}

	public void snmrootLoggerDEBUG(String message) {
		System.out.println(message);
		this.snmrootLogger.debug(message);
	}

	public void utilityLoggerDEBUG(String message) {
		System.out.println(message);
		this.utilityLogger.debug(message);
	}

	public void snmrootLoggerINFO(String message) {
		System.out.println(message);
		this.snmrootLogger.info(message);
	}

	public void utilityLoggerINFO(String message) {
		System.out.println(message);
		this.utilityLogger.info(message);
	}

	public void snmrootLoggerWARN(String message) {
		System.out.println(message);
		this.snmrootLogger.warn(message);
	}

	public void utilityLoggerWARN(String message) {
		System.out.println(message);
		this.utilityLogger.warn(message);
	}

	public void snmrootLoggerERROR(String message) {
		System.out.println(message);
		this.snmrootLogger.error(message);
	}

	public void utilityLoggerERROR(String message) {
		System.out.println(message);
		this.utilityLogger.error(message);
	}
}