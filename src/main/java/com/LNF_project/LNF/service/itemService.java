package com.LNF_project.LNF.service;

import com.LNF_project.LNF.model.Item;
import com.LNF_project.LNF.repository.itemRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.Servlet;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class itemService {
    private final itemRepo itemRepo;


    public itemService(itemRepo itemRepo, Item item, Servlet servlet){
        this.itemRepo = itemRepo;
    }

    public Item save(Item item){
        return itemRepo.save(item);
    }

    public List<Item> getAll(){
        return itemRepo.findAll();
    }

    public Optional<Item> getById(Integer id) {
        return itemRepo.findById(id);
    }

    public void deleteById(Integer id) {
        if(!itemRepo.existsById(id)){
            throw new EntityNotFoundException("Item not found");
        }
        itemRepo.deleteById(id);
    }

    public void updateFound(Integer id) {
        Item item = itemRepo.findById(id).orElseThrow(() -> new RuntimeException("Item Not Found"));
        item.setFound(true);
        itemRepo.save(item);
    }

    public Item updateInfo(Integer id, Map<String, Object> updates) {
        Item item = itemRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        Set<String> allowedAttributes = Set.of("itemName","description", "ownerName","contactNo");
        updates.keySet().retainAll(allowedAttributes);
        if(updates.containsKey("itemName")) item.setItemName((String) updates.get("itemName"));
        if(updates.containsKey("description")) item.setDescription((String) updates.get("description"));
        if(updates.containsKey("ownerName")) item.setOwnerName((String) updates.get("ownerName"));
        if(updates.containsKey("contactNo")) item.setContactNo((String) updates.get("contactNo"));

        return itemRepo.save(item);


    }
}
