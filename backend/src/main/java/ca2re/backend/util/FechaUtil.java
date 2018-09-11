package ca2re.backend.util;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class FechaUtil {
	public static Calendar convertirDeStringACalendar(String fecha) throws ParseException {	
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		cal.setTime(sdf.parse(fecha));
		return cal;
	}
}
