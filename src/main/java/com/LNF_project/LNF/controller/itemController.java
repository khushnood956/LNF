package com.LNF_project.LNF.controller;

import com.LNF_project.LNF.model.Item;
import com.LNF_project.LNF.service.itemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

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

    @GetMapping("/show/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable("id") Integer id){
        Optional<Item> item = service.getById(id);
        return item.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Item> DeleteById(@PathVariable Integer id){
         service.deleteById(id);
         return ResponseEntity.noContent().build();
    }

    @PatchMapping("/found/{id}")
    public ResponseEntity<Item> updateFoundStatus(@PathVariable Integer id){
        service.updateFound(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<Item> updateInfo(@PathVariable Integer id, @RequestBody Map<String, Object> updates){
        Item itemUpdated = service.updateInfo(id, updates);
        return ResponseEntity.ok(itemUpdated);

    }


}

