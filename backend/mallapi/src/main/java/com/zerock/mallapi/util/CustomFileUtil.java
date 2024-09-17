package com.zerock.mallapi.util;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.coobird.thumbnailator.Thumbnails;

@Component
@Log4j2
@RequiredArgsConstructor
public class CustomFileUtil {

    @Value("${org.zerock.upload.path}")
    private String uploadPath;

    @PostConstruct
    public void init() {
        File tempFolder = new File(uploadPath);

        if (tempFolder.exists() == false) {
            tempFolder.mkdirs();
        }

        uploadPath = tempFolder.getAbsolutePath();

        log.info("-------------------------------");
        log.info(uploadPath);
    }

    public List<String> saveFiles(List<MultipartFile> files) throws RuntimeException{
        if(files== null || files.size() ==0) {
            return List.of();
        }
        List<String> uploadNames = new ArrayList<>();

        for (MultipartFile multipartFile : files) {
            String savedName = UUID.randomUUID().toString() + "_" + multipartFile.getOriginalFilename();

            Path savePath = Paths.get(uploadPath, savedName);
            try {
                Files.copy(multipartFile.getInputStream(), savePath);

                String contentType = multipartFile.getContentType();

                if (contentType !=null && contentType.startsWith("image")) {
                    Path thumbnailsPath = Paths.get(uploadPath, "s_"+savedName);

                    Thumbnails.of(savePath.toFile())
                    .size(200, 200)
                    .toFile(thumbnailsPath.toFile());
                }
                uploadNames.add(savedName);
            } catch (Exception e) {
                throw new RuntimeException(e.getMessage());
            }
        }

        return uploadNames;
    }

    public ResponseEntity<Resource> getFile(String fileName) {
        org.springframework.core.io.Resource resource = new FileSystemResource(uploadPath + File.separator + fileName);

        if( !resource.isReadable()){
            resource = new FileSystemResource(uploadPath + File.separator + "maindog.gif");


        }

        HttpHeaders headers = new HttpHeaders();

        try {
            headers.add("Content-Type", Files.probeContentType(resource.getFile().toPath()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }

        return ResponseEntity.ok().headers(headers).body(resource);
    }

    public void deleteFiles(List<String> fileNames){
        if( fileNames == null || fileNames.size() ==0 ) {
            return ; 
        }
        
        fileNames.forEach( fileName -> {
            String thumbnailFileName = "s_" + fileName ; 

            Path thumbnailPath = Paths.get(uploadPath, thumbnailFileName);
            Path filePath = Paths.get(uploadPath,fileName);
            try {
                Files.deleteIfExists(filePath);
                Files.deleteIfExists(thumbnailPath);
            } catch (Exception e) {
                throw new RuntimeException(e.getMessage());
            }
        });
    }
}
