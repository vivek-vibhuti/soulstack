package com.soulstack.soulstack.repository;

import com.soulstack.soulstack.enitiy.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
