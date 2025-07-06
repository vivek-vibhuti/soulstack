package com.soulstack.soulstack.dto;


public class BookingRequestDTO {
    private String name;
    private String email;
    private String phone;
    private String service;
    private String preferredTime;
    private String message;
    private String budget;

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getService() { return service; }
    public void setService(String service) { this.service = service; }

    public String getPreferredTime() { return preferredTime; }
    public void setPreferredTime(String preferredTime) { this.preferredTime = preferredTime; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getBudget() { return budget; }
    public void setBudget(String budget) { this.budget = budget; }
}


