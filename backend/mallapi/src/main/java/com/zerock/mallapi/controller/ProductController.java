package com.zerock.mallapi.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.zerock.mallapi.dto.PageRequestDTO;
import com.zerock.mallapi.dto.PageResponseDTO;
import com.zerock.mallapi.dto.ProductDTO;
import com.zerock.mallapi.service.ProductService;
import com.zerock.mallapi.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;
    private final CustomFileUtil fileUtil;

    // @PostMapping("/")
    // public Map<String,String> register(ProductDTO productDTO) {
    //      log.info("register:" + productDTO);
    //     List<MultipartFile> files = productDTO.getFiles();

    //     List<String> uploadFileNames = fileUtil.saveFiles(files);
        
    //     productDTO.setUploadFileNames(uploadFileNames);

    //     log.info(uploadFileNames);
    //     return Map.of("Result","Success");
    // }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }

    @GetMapping("/list")
    public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO){
        log.info("list.............." + pageRequestDTO);

        return productService.getList(pageRequestDTO);
    }

    @PostMapping("/")
    public Map<String,Long> register(ProductDTO productDTO) {
        log.info("register: " +productDTO);

        List<MultipartFile> files = productDTO.getFiles();

        List<String> uploadFileNames = fileUtil.saveFiles(files);

        productDTO.setUploadFileNames(uploadFileNames);

        log.info(uploadFileNames);

        Long pno = productService.register(productDTO);
        
         
        return Map.of("result" , pno);
    }
    
    @GetMapping("/{pno}")
    public ProductDTO read(@PathVariable(name = "pno") Long pno) {
        return productService.get(pno);
    }

    @PutMapping("/{pno}")
    public Map<String,String> modify(@PathVariable(name= "pno")Long pno, ProductDTO productDTO) {
        productDTO.setPno(pno);

        ProductDTO oldProductDTO = productService.get(pno);

        List<String> oldFileNames = oldProductDTO.getUploadFileNames();

        List<MultipartFile> files = productDTO.getFiles();

        List<String> currentUploadFileNames = fileUtil.saveFiles(files);
        
        List<String> uploadFileNames = productDTO.getUploadFileNames();

        if(currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
            uploadFileNames.addAll(currentUploadFileNames);

        }
        productService.modify(productDTO);

        if (oldFileNames != null && oldFileNames.size() >0) {
           List<String> removeFiles = oldFileNames
           .stream()
           .filter(fileName -> uploadFileNames.indexOf(fileName) == -1)
           .collect(Collectors.toList()) ;

           fileUtil.deleteFiles(removeFiles);
        }
        return Map.of("Result" , "Success");
    }

    @DeleteMapping("/{pno}")
    public Map<String,String> remove(@PathVariable("pno") Long pno) {

        List<String> oldFileNames = productService.get(pno).getUploadFileNames();

        productService.remove(pno);
        
        fileUtil.deleteFiles(oldFileNames);

        return Map.of("Result" , "Success");
    }
    
    
    
}
