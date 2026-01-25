package com.LNF_project.LNF.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
@Entity @Data @Component
public class Item {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String itemName;
    private String description;
    private String ownerName;
    private boolean found;
    @Column(name = "contact_no")
    private String contactNo;

    public Item() {
    }

    public Item(Integer id, String itemName, String description, String ownerName, boolean found, String contactNo) {
        this.id = id;
        this.itemName = itemName;
        this.description = description;
        this.ownerName = ownerName;
        this.found = found;

        this.contactNo = contactNo;
    }

}
