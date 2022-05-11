package csafy.userservice.service.S3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.internal.Mimetypes;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.ListIterator;
import java.util.Optional;
import java.util.UUID;


@Slf4j
@RequiredArgsConstructor
@Component
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;  // S3 버킷 이름

    public String upload(MultipartFile file, String dir, Long userSeq) throws IOException {
        UUID uuid = UUID.randomUUID();
//        String fileName = uuid + file.getOriginalFilename();
        String fileName = uuid.toString();

        ObjectMetadata objectMetadata = new ObjectMetadata();
//        objectMetadata.setContentType(Mimetypes.getInstance().getMimetype(fileName));
//        objectMetadata.setContentType("image/jpg");
        objectMetadata.setContentType(file.getContentType());
        byte[] bytes = IOUtils.toByteArray(file.getInputStream());
        objectMetadata.setContentLength(bytes.length);
        ByteArrayInputStream byteArrayIs = new ByteArrayInputStream(bytes);

        removeFolder(dir + "/" + userSeq);

//        amazonS3Client.deleteObject(bucket,  dir + "/" + userSeq);

        amazonS3Client.putObject(new PutObjectRequest(bucket,  dir + "/" + userSeq + "/" + fileName, byteArrayIs, objectMetadata)
                .withMetadata(objectMetadata)
                .withCannedAcl(CannedAccessControlList.PublicRead));                                                        // public read 권한 주기

        return dir + File.separator + userSeq + File.separator + fileName;
    }

    //폴더 삭제 (폴더안의 모든 파일 삭제)
    public void removeFolder(String folderName){
        ListObjectsV2Request listObjectsV2Request = new ListObjectsV2Request().withBucketName(bucket).withPrefix(folderName+"/");
        ListObjectsV2Result listObjectsV2Result = amazonS3Client.listObjectsV2(listObjectsV2Request);

        for (S3ObjectSummary objectSummary : listObjectsV2Result.getObjectSummaries()) {
            DeleteObjectRequest request = new DeleteObjectRequest(bucket, objectSummary.getKey());
            amazonS3Client.deleteObject(request);
            System.out.println("Deleted " + objectSummary.getKey());
        }
    }
}