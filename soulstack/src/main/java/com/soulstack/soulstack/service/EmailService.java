package com.soulstack.soulstack.service;

import com.soulstack.soulstack.dto.BookingRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    private static final String TEAM_EMAIL = "soulstack@outlook.com";
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy 'at' hh:mm a z");

    public void sendBookingConfirmation(BookingRequestDTO formData) {
        String clientEmail = formData.getEmail();
        String clientName = formData.getName();
        String service = formData.getService();
        String preferredTime = formData.getPreferredTime() != null ? formData.getPreferredTime() : "To be scheduled";
        String budget = formData.getBudget() != null ? formData.getBudget() : "Not specified";
        String message = formData.getMessage();
        String phone = formData.getPhone() != null ? formData.getPhone() : "Not provided";
        String bookingDateTime = ZonedDateTime.now(java.time.ZoneId.of("Asia/Kolkata")).format(formatter);

        // ✉️ Client Confirmation Email
        SimpleMailMessage clientMessage = new SimpleMailMessage();
        clientMessage.setTo(clientEmail);
        clientMessage.setSubject("Your 1:1 Mentorship Consultation Booking Confirmation");
        clientMessage.setFrom(TEAM_EMAIL);
        clientMessage.setText(
                "Dear " + clientName + ",\n\n" +
                        "Thank you for booking a 1:1 mentorship consultation with the Soulstack Team!\n\n" +
                        "📌 Booking Details:\n" +
                        "- Service: " + service + "\n" +
                        "- Preferred Time: " + preferredTime + "\n" +
                        "- Your Email: " + clientEmail + "\n" +
                        "- Phone: " + phone + "\n" +
                        "- Budget: " + budget + "\n" +
                        "- Booking Date/Time: " + bookingDateTime + " IST\n" +
                        "- Message: " + message + "\n\n" +
                        "🔔 We've included:\n" +
                        "• Meeting details and agenda\n" +
                        "• Calendar invite for easy scheduling\n" +
                        "• Preparation guidelines\n" +
                        "• Our team contact information\n\n" +
                        "Our team will contact you within 24 hours to finalize the schedule and answer any questions.\n\n" +
                        "Best regards,\nSoulstack Team\n" +
                        "📧 Email: soulstack@outlook.com | 📞 Phone: +91 8521037825"
        );
        mailSender.send(clientMessage);

        // 📥 Team Notification Email
        SimpleMailMessage teamMessage = new SimpleMailMessage();
        teamMessage.setTo(TEAM_EMAIL);
        teamMessage.setSubject("New 1:1 Consultation Booking from " + clientName);
        teamMessage.setFrom(TEAM_EMAIL);
        teamMessage.setText(
                "🔔 New Booking Received:\n\n" +
                        "- Client Name: " + clientName + "\n" +
                        "- Client Email: " + clientEmail + "\n" +
                        "- Phone: " + phone + "\n" +
                        "- Service: " + service + "\n" +
                        "- Preferred Time: " + preferredTime + "\n" +
                        "- Budget: " + budget + "\n" +
                        "- Message: " + message + "\n" +
                        "- Booking Date/Time: " + bookingDateTime + " IST"
        );
        mailSender.send(teamMessage);
    }
}
