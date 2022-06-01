package com.gottig.portfolio.jwtsecurity.jwtcontroller;


import com.gottig.portfolio.jwtsecurity.jwtdto.JwtDTO;
import com.gottig.portfolio.jwtsecurity.jwtdto.JwtNewUserDTO;
import com.gottig.portfolio.jwtsecurity.jwtdto.JwtUserLoginDTO;
import com.gottig.portfolio.jwtsecurity.jwtenums.JwtRoleName;
import com.gottig.portfolio.jwtsecurity.jwtepf.JwtProvider;
import com.gottig.portfolio.jwtsecurity.jwtmodel.JwtRole;
import com.gottig.portfolio.jwtsecurity.jwtmodel.JwtUser;
import com.gottig.portfolio.jwtsecurity.jwtservice.JwtRoleService;
import com.gottig.portfolio.jwtsecurity.jwtservice.JwtUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUserService usuarioService;

    @Autowired
    JwtRoleService roleService;

    @Autowired
    JwtProvider jwtProvider;

    //Espera un json y lo convierte a tipo clase NuevoUsuario
    // Solo el administrador puede crear usuarios
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/newuser")
    public ResponseEntity<?> newUser(@Valid @RequestBody JwtNewUserDTO newUserDTO,
                                          BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return new ResponseEntity<>("Wrong field or invalid email", HttpStatus.BAD_REQUEST);
        }
        if(usuarioService.existsByUsuario(newUserDTO.getUserName())){
            return new ResponseEntity<>("Username already exists", HttpStatus.BAD_REQUEST);
        }
        if(usuarioService.existsByEmail(newUserDTO.getEmail())){
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }

        JwtUser user = new JwtUser(newUserDTO.getUserName(),
                newUserDTO.getEmail(), 
                passwordEncoder.encode(newUserDTO.getPassword()));

        Set<JwtRole> roles = new HashSet<>();
        roles.add(roleService.getByRoleName(JwtRoleName.ROLE_USER).get());
        if(newUserDTO.getRoles().contains("admin"))
            roles.add(roleService.getByRoleName(JwtRoleName.ROLE_ADMIN).get());
        user.setRoles(roles);

        usuarioService.save(user);

        return new ResponseEntity<>("User Created", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtDTO> login(@Valid @RequestBody JwtUserLoginDTO loginUserDTO, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return new ResponseEntity("Wrong fields", HttpStatus.BAD_REQUEST);
        }
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(loginUserDTO.getUserName(),
                                loginUserDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        JwtDTO jwtDto = new JwtDTO(jwt, userDetails.getUsername(), userDetails.getAuthorities());
        return new ResponseEntity<>(jwtDto, HttpStatus.OK);
    }
}