package com.LNF_project.LNF.controller;

import com.LNF_project.LNF.DTO.ApiResponse;
import com.LNF_project.LNF.DTO.ItemUpdateDto;
import com.LNF_project.LNF.model.Item;
import com.LNF_project.LNF.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/item")
public class ItemController {

    private final ItemService service;


    public ItemController(ItemService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Item>> addItem(@RequestBody Item item) {
        service.save(item);
        return ResponseEntity.ok(new ApiResponse<>(true, "Item Saved Successfully", item));
    }

    @GetMapping("/show")
    public ResponseEntity<ApiResponse<List<Item>>> showAll() {
        return ResponseEntity.ok(new ApiResponse<>(true, "List Returned Successfully", service.getAll()));

    }

    @GetMapping("/show/{id}")
    public ResponseEntity<ApiResponse<Item>> getItemById(@PathVariable("id") Integer id){
        Item item = service.getById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Item Found", item));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<Void>> DeleteById(@PathVariable Integer id){
        service.deleteById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Item Deleted Successfully", null));
    }

    @PatchMapping("/found/{id}")
    public ResponseEntity<ApiResponse<Void>> updateFoundStatus(@PathVariable Integer id){
        service.updateFound(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Updated Item Found Status", null));
    }

    @PatchMapping("/updateItem/{id}")
    public ResponseEntity<ApiResponse<Item>> updateInfo(@PathVariable Integer id, @RequestBody Map<String, Object> updates){
        Item itemUpdated = service.updateInfo(id, updates);
        return ResponseEntity.ok(new ApiResponse<>(true, "Item Updated Successfully", itemUpdated)); // with this data is sent back to client

//        return new ResponseEntity<Item>(HttpStatus.OK); // with this no data is sent to client empty body
    }
    @PatchMapping("/update/{id}")
    public ResponseEntity<ApiResponse<Item>> updateInfo(@PathVariable Integer id, @RequestBody ItemUpdateDto dto){
        Item updatedItem = service.updateItem(id,dto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Item Updated Successfully", updatedItem));
    }


}

