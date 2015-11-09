package com.dndcomp.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class DiceRollService {

    private final Logger log = LoggerFactory.getLogger(DiceRollService.class);
    
    public int rollDice() {
    	return 1;
    }

}
