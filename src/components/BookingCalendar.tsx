import { useEffect } from "react";
import {
  bookingCalendarId,
  bookingCalendarSrc,
  bookingFormEmbedScript,
} from "@/lib/booking";

const BookingCalendar = () => {
  useEffect(() => {
    if (document.querySelector(`script[src="${bookingFormEmbedScript}"]`)) {
      return;
    }

    const script = document.createElement("script");
    script.src = bookingFormEmbedScript;
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <iframe
      src={bookingCalendarSrc}
      allow="payment"
      scrolling="no"
      id={bookingCalendarId}
      title="Schedule a consultation with a licensed specialist"
      className="w-full min-h-[720px] border-0"
    />
  );
};

export default BookingCalendar;
