package com.LNF_project.LNF.controller;

import com.LNF_project.LNF.model.Item;
import com.LNF_project.LNF.service.itemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
public class itemController {

    private final itemService service;

    public itemController(itemService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public Item addItem(@RequestBody Item item) {
        return service.save(item);
    }

    @GetMapping("/show")
    public List<Item> showAll() {
        return service.getAll();
    }
}

