package com.soulstack.soulstack.controller;

import com.soulstack.soulstack.dto.BookingRequestDTO;
import com.soulstack.soulstack.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.POST}, allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api/booking") // Match Vite dev server
public class BookingController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitBooking(@RequestBody BookingRequestDTO formData) {
        try {
            // Basic validation
            if (formData.getName() == null || formData.getEmail() == null || formData.getService() == null) {
                return ResponseEntity.badRequest().body("Missing required fields: name, email, or service");
            }

            // Log for debug
            System.out.println("Received booking: " + formData.getName() + " - " + formData.getEmail());

            // Call service
            emailService.sendBookingConfirmation((BookingRequestDTO) formData);

            return ResponseEntity.ok("Booking confirmed and emails sent successfully");

        } catch (Exception e) {
            System.err.println("Error in submitBooking: " + e.getMessage());
            return ResponseEntity.badRequest().body("Failed to send emails: " + e.getMessage());
        }
    }
}
