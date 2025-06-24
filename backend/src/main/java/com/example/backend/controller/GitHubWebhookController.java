package com.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/github-webhook")
@RequiredArgsConstructor
public class GitHubWebhookController {

    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping
    public ResponseEntity<Void> onCommit(@RequestBody Map<String, Object> payload) {
        var commits = (List<?>) payload.get("commits");
        if (commits != null && !commits.isEmpty()) {
            var commit = (Map<String, Object>) commits.get(0);
            var mensaje = commit.get("message").toString();
            System.out.println(mensaje);
            messagingTemplate.convertAndSend("/topic/commit", mensaje);
        }
        return ResponseEntity.ok().build();
    }
}
