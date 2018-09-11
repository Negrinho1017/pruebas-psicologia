package ca2re.backend.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class FechaUtil {
	public static Calendar convertirDeStringACalendar(String fecha) throws ParseException {	
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		cal.setTime(sdf.parse(fecha));
		System.out.println(cal.getTime().toString());
		return cal;
	}
}
