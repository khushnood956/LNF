package com.LNF_project.LNF.service;

import com.LNF_project.LNF.model.Item;
import com.LNF_project.LNF.repository.itemRepo;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class itemService {
    private final itemRepo itemRepo;

    public itemService(itemRepo itemRepo){
        this.itemRepo = itemRepo;
    }

    public Item save(Item item){
        return itemRepo.save(item);
    }

    public List<Item> getAll(){
        return itemRepo.findAll();
    }
}
